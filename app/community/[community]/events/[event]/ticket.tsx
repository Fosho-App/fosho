import { inter } from "@/app/ui/fonts";
import { FaRegCircleCheck } from "react-icons/fa6";
import {QRCodeCanvas} from 'qrcode.react';
import { AttendeeInfo } from "@/app/plugin/client";
import { FaRegUser } from "react-icons/fa";

export default function Ticket(
  {attendee, organizer}:
  {attendee: AttendeeInfo | null | undefined, organizer: string}
) {

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
              <FaRegUser className="text-light-green text-[14px]"/>
              {organizer}
            </p> : ""
          }
          <div className="bg-white p-2 rounded-md">
            <QRCodeCanvas value={attendee.publicKey.toBase58()} />
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