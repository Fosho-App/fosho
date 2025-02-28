'use client'

import { inter } from "@/app/ui/fonts";
import { FaRegCircleCheck } from "react-icons/fa6";
import {QRCodeCanvas} from 'qrcode.react';
import { AttendeeInfo } from "@/app/plugin/client";
import { FaRegUser } from "react-icons/fa";
import { DefaultButton } from "@/app/ui/buttons";
import { useContext } from "react";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { useCancelCommit } from "@/app/hooks/useCancelCommit";
import { PublicKey } from "@solana/web3.js";

export default function Ticket(
  {attendee, organizer, communityKey, eventKey, cancelOverAt}:
  {
    attendee: AttendeeInfo | null | undefined, 
    organizer: string, 
    communityKey: PublicKey, 
    eventKey: PublicKey,
    cancelOverAt: number | null
  }
) {

  const {client} = useContext(ClientContext) as ClientContextType
  const {mutateAsync, isPending, isError, error, isSuccess} = useCancelCommit(client, communityKey, eventKey)
  
  async function cancelCommit() {
    await mutateAsync()
  }

  return (
    attendee ?
      attendee.status.claimed ?
        <div className=""></div> :
      attendee.status.pending ?
        <div className="flex flex-col items-center gap-4 mx-4">
          <FaRegCircleCheck className="text-4xl text-fosho-red" />
          <p className={`${inter.className} leading-4 text-sm font-semibold w-full text-center`}>
            Thanks for committing to the event!<br />
            Have the organizer redeem your tokens by having them scan the QR code below
          </p>
          {organizer ?
            <p className={`${inter.className} text-md text-xs font-medium text-center flex gap-2`}>
              Event Organizer 
              <FaRegUser className="text-fosho-red text-[14px]"/>
              {organizer}
            </p> : ""
          }
          <div className="bg-white p-2 rounded-md">
            <QRCodeCanvas value={attendee.publicKey.toBase58()} />
          </div>
          <div className={`text-gray-400 ${inter.className} text-sm`}>OR</div>
          {typeof cancelOverAt === 'number' && Date.now() < cancelOverAt &&
            <DefaultButton full={true} onClick={cancelCommit} disabled={isPending || isSuccess}>
              Cancel Commitment
            </DefaultButton>
          }
          {
            isError && 
            <div className="text-sm my-2 text-center text-red-500">
              {error.message.slice(error.message.indexOf('Error Code') === -1 ? 0 : error.message.indexOf('Error Code'))}
            </div>
          }
          <div className="text-sm text-gray-300">
            You cannot rejoin the event after you cancel
          </div>
        </div> :
      attendee.status.rejected ?
        <div className=""></div> :
      attendee?.status.verified ?
        <div className=""></div> :
        "Cannot find the ticket" :
      "Cannot find the ticket"
  )
}