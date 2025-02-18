'use client'

import CreateEventForm from "@/app/ui/events/create-event";
import { bebas } from "@/app/ui/fonts";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import {BN} from "@coral-xyz/anchor";
import { useContext, useState } from "react";
import { useGetTokensHolding } from "@/app/hooks/useTokenHolding";
import { useCreateEvent } from "@/app/hooks/useCreateEvent";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { DefaultButton } from "@/app/ui/buttons";
import MainNav from "@/app/ui/navs/main-nav";

//  enum EventType {
//   InPerson,
//   Virtual,
//   Exhibition,
//   Conference,
//   Concert,
//   SportingEvent,
//   Workshop,
//   Webinar,
//   NetworkingEvent,
// }

export type EventData = {
  name: string
  // uri: string
  // eventType: EventType
  organizer: string
  commitmentFee: BN
  eventStartsAt: number
  eventEndsAt: number
  registrationStartsAt: number
  registrationEndsAt: number
  capacity: number
  location: string
  // virtualLink: string | null
  description: string
  rewardAmount: BN
  rewardMint: string | null
}

export default function CreateEvent() {
  const router = useRouter()
  const params = useParams()
  const {client} = useContext(ClientContext) as ClientContextType
  
  const {mutateAsync, isPending, isError, error} = useCreateEvent(client, params.community as string)
  const [txLink, setTxLink] = useState<string | null>(null);

  const [event, setEvent] = useState<EventData>({
    name: "",
    description: "",
    commitmentFee: new BN(0),
    capacity: 0,
    eventStartsAt: Date.now(),
    eventEndsAt: Date.now(),
    location: "",
    registrationStartsAt: Date.now(),
    registrationEndsAt: Date.now(),
    rewardAmount: new BN(0),
    rewardMint: null,
    organizer: ""
  });

  function backToEvents() {
    router.push(`/community/${params.community}`)
  }

  async function createEventHandler() {
    setTxLink("")
    const result = await mutateAsync(event)
    if (result) {
      setTxLink(result.tx)
      router.push(`/community/${params.community}`)
    }
  }

  const tokenHoldings = useGetTokensHolding().data

  return (
    <div className="bg-black text-white p-2 min-h-screen">
      <MainNav />

      <div className={`${bebas.className} flex items-center text-2xl mt-6 mb-2`}>
        <div className="text-white">
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
        <DefaultButton full={true} onClick={createEventHandler} disabled={isPending}>
          {isPending ? "Creating Event" : "Create Event"}
        </DefaultButton>
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