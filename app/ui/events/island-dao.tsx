'use client'

import { inter } from "../fonts";
import { format } from "date-fns";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import { useGetMintData } from "@/app/hooks/useMintData";
import { FormatBalance } from "../format-balance";
import { EventInfoWithMeta } from "@/app/hooks/useGetEvents";

export default function IslandDaoEvent(
  {event, onClick}: {event: EventInfoWithMeta, onClick: (s: string) => void}
) {
  const mintData = useGetMintData(event.rewardMint?.toBase58()).data

  return (
    <div 
      className={`${inter.className} w-full flex gap-3 bg-gradient-to-b from-[#F3FFF5] to-[#C5F0CC] 
        shadow-event p-3 rounded-lg mt-4`
      }
      onClick={() => onClick(event.publicKey.toBase58())}
    >
      <div className="bg-gradient-to-b from-[#73A584] to-[#062310] h-auto w-[5px] rounded-l-lg"></div>
        <div className="w-full">
          <p className="text-light-green text-sm font-medium">{format(event.eventStartTime.toNumber()*1000, "EE, MMM d p")}</p>
          <h3 className="text-primary-green font-semibold">{event.title}</h3>
          <p className="text-light-green text-sm font-medium">Limit: {event.currentAttendees}/{event.maxAttendees} People</p>
          <div className="flex gap-2 mt-2">
            <div className="w-1/2 bg-[#F3FFF5] py-2 px-4 rounded-lg">
              <p className="text-sm text-light-green">Cost</p>
              <h4 className="text-primary-green font-bold">{event.commitmentFee.toNumber()/LAMPORTS_PER_SOL} SOL</h4>
            </div>
            <div className="w-1/2 bg-[#F3FFF5] py-2 px-4 rounded-lg">
              <p className="text-sm text-light-green">Reward</p>
              <h4 className="text-primary-green font-bold">{
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