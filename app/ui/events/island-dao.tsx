'use client'

import { inter } from "../fonts";
import { format } from "date-fns";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import { useGetMintData } from "@/app/hooks/useMintData";
import { FormatBalance } from "../format-balance";
import { EventInfo } from "@/app/plugin/client";

export default function IslandDaoEvent(
  {event, onClick}: {event: EventInfo, onClick: (s: string) => void}
) {
  const mintData = useGetMintData(event.rewardMint?.toBase58()).data
  const isEventActive = event.registrationEndsAt && event.registrationEndsAt > Date.now()

  return (
    <div 
      className={`${inter.className} w-full flex gap-3 bg-background-main 
        shadow-event p-3 rounded-lg mt-4 text-white`
      }
      onClick={() => onClick(event.publicKey.toBase58())}
    >
      <div className={`${isEventActive ? 'bg-fosho-red' : 'bg-background-second'} h-auto w-[5px] rounded-l-lg`}></div>
        <div className="w-full">
          <p className="text-secondary-text text-sm font-medium">
            {event.eventStartsAt ? format(event.eventStartsAt, "EE, MMM d p") : 'Unrestricted'}
          </p>
          <h3 className="text-white font-semibold">{event.name}</h3>
          <p className="text-secondary-text text-sm font-medium">
            Limit: {event.current}/{event.capacity ? event.capacity : 'Unlimited'} People Joined
          </p>
          <div className="flex gap-2 mt-2">
            <div className="w-1/2 bg-background-second py-2 px-4 rounded-lg">
              <p className="text-sm text-secondary-text">Cost</p>
              <h4 className="text-white font-bold">{event.commitmentFee.toNumber()/LAMPORTS_PER_SOL} SOL</h4>
            </div>
            <div className="w-1/2 bg-background-second py-2 px-4 rounded-lg">
              <p className="text-sm text-secondary-text">Reward</p>
              <h4 className="text-white font-bold">{
              event.rewardPerUser.gt(new BN(0)) ?
                <FormatBalance decimals={mintData?.decimals} weight={event.rewardPerUser} name={mintData?.name} /> :
                "-"
              }</h4>
            </div>
        </div>
      </div>
    </div>
  )
}