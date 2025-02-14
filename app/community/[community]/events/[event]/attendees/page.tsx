'use client'

import { useGetCommunity } from "@/app/hooks/useCommunity";
import { useGetAttendeesForEvent } from "@/app/hooks/useGetAttendee";
import { useGetEvent } from "@/app/hooks/useGetEvents";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { Attendee } from "@/app/ui/event/attendee";
import { bebas } from "@/app/ui/fonts";
import MainNav from "@/app/ui/navs/main-nav";
import { useWallet } from "@solana/wallet-adapter-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";


export default function Attendees() {
  const {community, event} = useParams()
  const router = useRouter()
  const {publicKey} = useWallet()

  const {client, umi} = useContext(ClientContext) as ClientContextType
  const eventData = useGetEvent(client, umi, event as string).data 
  const attendeeRecords = useGetAttendeesForEvent(client, event as string).data
  const communityData = useGetCommunity(client, community as string).data

  function backToEvents() {
    router.push(`/community/${community}/events/${event}`)
  }

  function verifyUsers(attendeeKey: string) {
    router.push(`/community/${community}/events/${event}/verify?user=${attendeeKey}`)
  }

  return (
    <div className="bg-black text-white p-2 min-h-screen">
      <MainNav />
        <div className="text-white absolute top-[70px] left-2">
          <IoChevronBack className="font-bold text-2xl" onClick={backToEvents}/>
        </div>
        <div className={`${bebas.className} flex items-center text-2xl mt-6 mb-2`}>
          {eventData ?
            <div className="text-center w-full">
              <h1>{eventData.name}</h1>
            </div> :
            <div className="text-center w-full">Cannot find the event.</div>
          }
        </div>
        <h3 className={`${bebas.className} text-center text-xl mt-4 mb-2`}>Attendees</h3>
        <div className="mt-4">
          {attendeeRecords ?
            attendeeRecords.map((attendee, index) => (
              <div key={attendee.publicKey.toBase58()} className="w-full">
                <Attendee attendee={attendee} index={index} verifyUsers={verifyUsers}
                  isOwner={
                    publicKey !== null && 
                    communityData !== null && 
                    communityData !== undefined &&
                    communityData.authority.equals(publicKey)
                  } 
                />
              </div>
            ))
          : null}
        </div>
    </div>
  )
}