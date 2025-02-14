'use client'

import { useGetOtherAttendee } from '@/app/hooks/useGetAttendee';
import { useGetEvents } from '@/app/hooks/useGetEvents';
import { useVerifyUser } from '@/app/hooks/useVerifyUsers';
import { ClientContext, ClientContextType } from '@/app/providers/client-provider';
import { VerifyButton } from '@/app/ui/buttons';
import { inter } from '@/app/ui/fonts';
import { ellipsify } from '@/app/utils';
import { PublicKey } from '@solana/web3.js';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { useContext, useEffect, useRef, useState } from "react";
import { IoChevronBack } from 'react-icons/io5';

export default function VerifyUser() {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);

  const { event, community } = useParams()
  const searchParams = useSearchParams()
  const attendeeKeyFromParams = searchParams.get("user")

  const router = useRouter()
  const [attendeeKey, setAttendeeKey] = useState<string>(attendeeKeyFromParams ?? "");
  const [errorMsg, setError] = useState("")

  const {client, umi} = useContext(ClientContext) as ClientContextType

  const attendeeRecord = useGetOtherAttendee(client, attendeeKey).data
  const eventInfo = useGetEvents(client, umi, community as string)
    .data?.find(e => e.publicKey.toBase58() === event)

  const { mutateAsync, isSuccess } = useVerifyUser(
    client, 
    new PublicKey(community as string),
    new PublicKey(event as string),
    attendeeRecord ? new PublicKey(attendeeKey) : undefined
  )

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: () => {},
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      })

      scanner?.current?.start()       
    }
  }, [])
  
  function onScanSuccess(result: QrScanner.ScanResult) {
    console.log(result);
    setAttendeeKey(result?.data);
    scanner?.current?.stop();
  }

  async function verifyUser(accept: boolean) {
    if (attendeeRecord) {
      await mutateAsync({acceptAttendee: accept, owner: attendeeRecord.owner})
    } else {
      setError("Cannot find the attendee record")
    }
  }

  function backToEvent() {
    router.push(`/community/${community}/events/${event}`)
  }

  return (
    <div className="m-2">
      {attendeeKey ? 
        <div className='w-full text-center mt-4'>
          <h2 className={`${inter.className} text-xl font-semibold`}>
            Approve Attendee 
            {eventInfo ? " for " + eventInfo.name : ""}
          </h2>
          {attendeeRecord ?
            <div>
              <p className='mt-4'>
                Attendee Wallet: {ellipsify(attendeeRecord.owner.toBase58(), 8)}
              </p>
              {attendeeRecord.status.pending ?
                <div className="">
                  <div className="flex justify-center gap-8 mt-8">
                    <VerifyButton color="bg-green-600" onClick={() => verifyUser(true)}>Approve</VerifyButton>
                    <VerifyButton color="bg-red-600" onClick={() => verifyUser(false)}>Reject</VerifyButton>
                  </div>
                  {errorMsg && 
                    <div className="text-sm my-2 text-center text-red-500">
                      {errorMsg}
                    </div>
                  }
                  {isSuccess && 
                    <div className="text-white text-center mt-6">
                      <div>Transaction is Successful.</div>
                      <div className="flex justify-center items-center gap-1" onClick={backToEvent}>
                        <IoChevronBack />
                        Back to Event
                      </div>
                    </div>
                  }
                </div> :
                <div className="text-center mt-4">
                  {attendeeRecord.status.verified ?
                    <div className="text-green-600">This user is already verified</div> :
                    <div className="text-red-600">This user is already rejected</div>
                  }
                </div> 
              }  
            </div> : ""}
        </div> :
        <div className="">
          <video ref={videoEl} className='w-full h-96'></video>
          <div ref={qrBoxEl} className="h-96"></div>
        </div>
      }
      <div className="flex justify-center items-center gap-1 mt-8" onClick={backToEvent}>
        <IoChevronBack />
        Back to Event
      </div>
    </div>
  );
}