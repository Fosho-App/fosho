'use client'

import { useGetEvents } from "@/app/hooks/useGetEvents";
import { useGetMintData } from "@/app/hooks/useMintData";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { GradientButton } from "@/app/ui/buttons";
import { bebas } from "@/app/ui/fonts";
import { FormatBalance } from "@/app/ui/format-balance";
import { WalletButtonEvent } from "@/app/ui/wallet-button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import {BN} from "@coral-xyz/anchor";
import { format } from "date-fns";
import { LuCalendarRange } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";

export default function Event() {
  const params = useParams()
  const router = useRouter()
  const event = params.event as string

  const {client} = useContext(ClientContext) as ClientContextType
  const events = useGetEvents(client).data

  const currentEvent = events ? events.find(e => e.publicKey.toBase58() === event) : null
  const mintData = useGetMintData(currentEvent?.rewardMint?.toBase58()).data

  function backToEvents() {
    router.push("/community/events")
  }

  return (
    <div className="bg-[#cdedce] text-primary-green p-2 min-h-screen">
      <div className="flex items-center justify-between">
        <img src="/images/islanddao-fosho.png" width={63} height={20}/>
        <img src="/images/islanddao-logo-1.png" width={23}/>
        <WalletButtonEvent />
      </div>
      
      <div className={`${bebas.className} flex items-center text-2xl mt-6 mb-2`}>
        <div className="text-[#062310]">
          <IoChevronBack className="font-bold" onClick={backToEvents}/>
        </div>
        {
          currentEvent ?
          <div className="text-center w-full">
            <h1>{currentEvent.title}</h1>
          </div> :
          <div className="">Cannot find the event.</div>
        }
      </div>

      {
        currentEvent ?
          <div className="text-[#062310]">
            <GradientButton full={true}>Commit to Event</GradientButton>
            <div className="flex gap-2 mt-4 text-sm">
              <div className="w-1/2 bg-[#F3FFF5] py-2 px-4 rounded-lg">
                <p>Cost</p>
                <h4 className="text-primary-green font-bold">
                  {currentEvent.commitmentFee.toNumber()/LAMPORTS_PER_SOL} SOL
                </h4>
              </div>
              <div className="w-1/2 bg-[#F3FFF5] py-2 px-4 rounded-lg">
                <p>Reward</p>
                <h4 className="text-primary-green font-bold">{
                  currentEvent.rewardPerUser.gt(new BN(0)) ?
                    <FormatBalance 
                      decimals={mintData?.decimals} 
                      weight={currentEvent.rewardPerUser} 
                      name={mintData?.name} 
                    /> :
                    "-"
                  }
                </h4>
              </div>
            </div>
            <div className="bg-[#F3FFF5] py-2 px-4 rounded-lg mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <LuCalendarRange className="text-light-green text-xl"/>
                <p className="text-sm font-medium">
                  {format(currentEvent.eventStartTime.toNumber()*1000, "EE, MMM d p")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <HiUsers className="text-light-green text-xl"/>
                <p className="text-sm font-medium">
                  {currentEvent.maxAttendees} Attendees
                </p>
              </div>
            </div>
            <h2 className={`${bebas.className} text-2xl mt-4`}>description</h2>
            <div className="bg-[#F3FFF5] py-2 px-4 rounded-lg text-sm">
              {currentEvent.description }
            </div>
          </div> : 
          ""
      }
    </div>
  )
}