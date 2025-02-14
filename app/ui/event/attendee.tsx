import { AttendeeInfo } from "@/app/plugin/client";
import { ellipsify } from "@/app/utils";
import { FaCheck } from "react-icons/fa";

export function Attendee(
  {attendee, index, isOwner, verifyUsers}: 
  {
    attendee: AttendeeInfo, 
    index: number, 
    isOwner: boolean,
    verifyUsers: (s: string) => void
  }
) {
  return (
    <div className=" bg-background-second py-2 px-4 rounded-lg mt-2 flex gap-2 text-center justify-between">
      <p>
        <span className="mr-2">{index+1}.</span> 
        {ellipsify(attendee.owner.toBase58(), 8)}
      </p>
      <p className="flex gap-2 items-center">
        {attendee.status.verified ? 
        <span className="text-green-400">Verified</span> :
        attendee.status.pending ?
        <span className="text-orange-400">Pending</span> :
        attendee.status.claimed ?
        <span className="text-green-400">Claimed</span> :
        <span className="text-red-400">Rejected</span>
        }
        {isOwner && attendee.status.pending ?
          <FaCheck className="font-bold" onClick={() => verifyUsers(attendee.publicKey.toBase58())}/>
        : null}
      </p>
    </div>
  )
}