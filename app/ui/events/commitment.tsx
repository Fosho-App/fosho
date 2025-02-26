import { AttendeeInfo } from "@/app/plugin/client";
import { EventButton } from "../buttons";

export function Commitment(
  {attendee, getEventName, claimReward, disabled}: 
  {
    attendee: AttendeeInfo, 
    getEventName: (eventKey: string) => string,
    claimReward: (k: AttendeeInfo) => void,
    disabled?: boolean
  }
) {
  return (
    <div className=" bg-background-second py-2 px-4 rounded-lg mt-2">
      <div className="flex gap-2 text-center justify-between">
        <p>
          <span className="text-gray-300 text-sm">Event Name: </span>
          <span className="">{getEventName(attendee.event.toBase58())}</span>
        </p>
        {attendee.status.verified ?
          <div>
            <EventButton 
              selected={false} 
              onClick={() => claimReward(attendee)}
              disabled={disabled}
            >
              Claim
            </EventButton>
          </div> : 
        ""} 
      </div>
      <div className="">
        <p className="flex gap-2 items-baseline">
          <span className="text-gray-200 text-sm">Status: </span>
          {attendee.status.verified ? 
          <span className="text-green-400">Verified</span> :
          attendee.status.pending ?
          <span className="text-orange-400">Pending</span> :
          attendee.status.claimed ?
          <span className="text-green-600">Claimed</span> :
          <span className="text-red-400">Rejected</span>
          }
        </p>
      </div>
    </div>
  )
}