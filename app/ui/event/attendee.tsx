import { AttendeeInfo } from "@/app/plugin/client";
import { ellipsify } from "@/app/utils";
import { FaCheck } from "react-icons/fa";

export function Attendee(
  {attendee, index, isOwner, verifyUsers, name}: 
  {
    attendee: AttendeeInfo,
    index: number, 
    isOwner: boolean,
    verifyUsers: (s: string) => void,
    name?: string
  }
) {
  return (
    <div className=" bg-background-second py-2 px-4 rounded-lg mt-2">
      <div className="flex gap-2 text-center justify-between">
        <p>
          <span className="text-gray-400 mr-1 text-sm">{index+1}.</span>
          {name ? name : ellipsify(attendee.owner.toBase58(), 8)}
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
            <FaCheck className="font-bold" onClick={() => verifyUsers(attendee.owner.toBase58())}/>
          : null}
        </p>
      </div>
      <div className="text-[10px] text-gray-400 mt-1">
        {attendee.owner.toBase58()}
      </div>
    </div>
  )
}