'use client'

import CreateEventForm from "@/app/ui/events/create-event";
import { bebas } from "@/app/ui/fonts";
import { WalletButtonEvent } from "@/app/ui/wallet-button";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import {BN} from "@coral-xyz/anchor";
import { useContext, useState } from "react";
import { useGetTokensHolding } from "@/app/hooks/useTokenHolding";
import { useCreateEvent } from "@/app/hooks/useCreateEvent";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { GradientButton } from "@/app/ui/buttons";

export type EventData = {
  name: string,
  description: string,
  commitmentFee: BN,
  eventDate: number,
  registrationDate: number,
  maxAttendees: number,
  rewardAmount: BN,
  rewardMint: string | null
}

export default function CreateEvent() {
  const router = useRouter()
  const {client} = useContext(ClientContext) as ClientContextType

  const {mutateAsync, isPending, isError, error} = useCreateEvent(client)
  const [txLink, setTxLink] = useState<string | null>(null);

  const [event, setEvent] = useState<EventData>({
    name: "",
    description: "",
    commitmentFee: new BN(0),
    maxAttendees: 0,
    eventDate: Date.now(),
    registrationDate: Date.now(),
    rewardAmount: new BN(0),
    rewardMint: null
  });

  function backToEvents() {
    router.push("/community/events")
  }

  async function createEventHandler() {
    setTxLink("")
    const result = await mutateAsync(event)
    
    if (result) {
      setTxLink(result.tx)
      router.push(`/community/events/${result.eventKey}`)
    }
  }

  const tokenHoldings = useGetTokensHolding().data

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
        <div className="text-center w-full">
          <h1>Create Event</h1>
        </div>
      </div>
      <CreateEventForm 
        event={event} 
        setEvent={setEvent} 
        tokens={tokenHoldings ?? []
      }/>
      <div className="mt-4">
        <GradientButton full={true} onClick={createEventHandler} disabled={isPending}>
          {isPending ? "Creating Event" : "Create Event"}
        </GradientButton>
      </div>
      <div className="mt-4">{txLink}</div>
      {
        isError && 
        <div className="text-sm my-2 text-center text-red-500">
          {error.message}
        </div>
      }
    </div>
  )
}