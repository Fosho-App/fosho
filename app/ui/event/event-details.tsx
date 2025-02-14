import { EventInfo } from "@/app/plugin/client";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FormatBalance } from "../format-balance";
import { MintInfoType } from "@/app/hooks/useMintData";
import { LuCalendarRange } from "react-icons/lu";
import { format } from "date-fns";
import { MdLocationOn } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { bebas } from "../fonts";
import { BN } from "@coral-xyz/anchor";
import { CiViewList } from "react-icons/ci";

export default function EventDetails(
  {event, mintData, viewAttendees} : 
  {
    event: EventInfo, 
    mintData: MintInfoType | null | undefined,
    viewAttendees: () => void
  }
) {
  return (
    <div className="">
      <div className="flex gap-2 mt-4 text-sm">
        <div className="w-1/2 bg-background-second py-2 px-4 rounded-lg">
          <p>Cost</p>
          <h4 className="text-white font-bold">
            {event.commitmentFee.toNumber()/LAMPORTS_PER_SOL} SOL
          </h4>
        </div>
        <div className="w-1/2 bg-background-second py-2 px-4 rounded-lg">
          <p>Reward</p>
          <h4 className="text-white font-bold">{
            event.rewardPerUser.gt(new BN(0)) ?
              <FormatBalance
                decimals={mintData?.decimals} 
                weight={event.rewardPerUser} 
                name={mintData?.name} 
              /> :
              "-"
            }
          </h4>
        </div>
      </div>
      <div className="bg-background-second py-2 px-4 rounded-lg mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LuCalendarRange className="text-fosho-red text-xl"/>
          <p className="text-sm font-medium">
            {event.eventStartsAt ?
              format(event.eventStartsAt, "EE, MMM d p") :
              'Unrestricted'
            }
          </p>
        </div>
        {event.location ? 
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-fosho-red text-xl"/>
            <p className="text-sm font-medium">
              {event.location}
            </p>
          </div> :
          ""
        }
        {event.organizer ? 
          <div className="flex items-center gap-2">
            <FaRegUser className="text-fosho-red text-xl"/>
            <p className="text-sm font-medium">
              {event.organizer}
            </p>
          </div> :
          ""
        }
        <div className="flex items-center gap-2">
          <HiUsers className="text-fosho-red text-xl"/>
          <p className="text-sm font-medium">
            {event.capacity ? event.capacity : 'Unlimited'} Attendees ({event.current} registered)
          </p>
        </div>
        <div className="flex items-center gap-2" onClick={viewAttendees}>
          <CiViewList className="text-fosho-red text-xl"/>
          <p className="text-sm font-semibold">
            View Attendees
          </p>
        </div>
      </div>
      <div className="bg-background-second py-2 px-4 rounded-lg mt-4 flex flex-col gap-2 text-center">
        <div className="flex items-center gap-2">
          <span className="text-fosho-red text-sm">Registration starts at</span>
          <p className="text-sm font-medium">
            {event.registrationStartsAt ?
              format(event.registrationStartsAt, "EE, MMM d p") :
              'Unrestricted'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-fosho-red text-sm">Registration ends at</span>
          <p className="text-sm font-medium">
            {event.registrationEndsAt ?
              format(event.registrationEndsAt, "EE, MMM d p") :
              'Unrestricted'
            }
          </p>
        </div>
      </div>
      <h2 className={`${bebas.className} text-2xl mt-4 mb-2`}>description</h2>
      <div className="bg-background-second py-2 px-4 rounded-lg text-sm">
        {event.description }
      </div>
    </div>
  )
}