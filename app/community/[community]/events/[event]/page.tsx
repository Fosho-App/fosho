'use client'

import { useGetEvents } from "@/app/hooks/useGetEvents";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { bebas } from "@/app/ui/fonts";
import { PublicKey } from "@solana/web3.js";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import JoinEvent from "./commit";
import Ticket from "./ticket";
import { useGetAttendee } from "@/app/hooks/useGetAttendee";
import { useGetCommunity } from "@/app/hooks/useCommunity";
import { useWallet } from "@solana/wallet-adapter-react";
import { DefaultButton } from "@/app/ui/buttons";
import EventDetails from "@/app/ui/event/event-details";
import { useGetMintData } from "@/app/hooks/useMintData";
import ClaimRewards from "./claim";
import MainNav from "@/app/ui/navs/main-nav";
import { EventOver, EventOverType } from "./event-over";

export default function Event() {
  const {publicKey} = useWallet()
  const params = useParams()
  const router = useRouter()
  const communityKey = typeof params.community === "string" ? params.community : ""
  const event = typeof params.event === "string" ? params.event : ""

  const {client, umi} = useContext(ClientContext) as ClientContextType
  const events = useGetEvents(client, umi, communityKey).data
  const community = useGetCommunity(client, communityKey).data

  const currentEvent = events ? events.find(e => e.publicKey.toBase58() === event) : null
  const attendeeRecord = useGetAttendee(client, currentEvent?.publicKey).data
  const mintData = useGetMintData(currentEvent?.rewardMint?.toBase58()).data

  function backToEvents() {
    router.push(`/community/${communityKey}`)
  }

  function verifyUsers() {
    router.push(`/community/${communityKey}/events/${event}/verify`)
  }
  
  return (
    <div className="bg-black text-white p-2 min-h-screen">
      <MainNav />
      
      <div className="text-white absolute top-[70px] left-2">
        <IoChevronBack className="font-bold text-2xl" onClick={backToEvents}/>
      </div>
      <div className={`${bebas.className} flex items-center text-2xl mt-6 mb-2`}>
        {
          currentEvent ?
            <div className="text-center w-full">
              <h1>{currentEvent.name}</h1>
            </div> :
            <div className="text-center w-full">Cannot find the event.</div>
        }
      </div>
      
      <div className="text-white">
        {currentEvent ?
          attendeeRecord === null ?
            publicKey && !community?.authority.equals(publicKey) ?
              currentEvent.eventEndsAt && currentEvent.eventEndsAt < Date.now() ?
                <div className="w-full text-center">
                  <EventOver eventOverType={EventOverType.CommitOver} />
                </div> :
                <JoinEvent 
                  eventKey={currentEvent.publicKey} 
                  communityKey={new PublicKey(communityKey)} 
                /> :
              null :
          attendeeRecord === undefined ?
            "" :
          attendeeRecord?.status.verified ?
            <ClaimRewards 
              event={currentEvent}
              communityKey={new PublicKey(communityKey)} 
              mintData={mintData} 
              attendeeRecordKey={attendeeRecord.publicKey}
            /> :
          attendeeRecord?.status.pending && currentEvent.eventEndsAt && currentEvent.eventEndsAt > Date.now() ?
            <Ticket attendee={attendeeRecord} organizer={currentEvent.organizer} /> :
          attendeeRecord?.status.rejected ?
            <EventOver eventOverType={EventOverType.Rejected} /> :
            <EventOver eventOverType={EventOverType.ClaimOver} /> :
        null}
        {publicKey && community?.authority.equals(publicKey) ?
          <div className="w-full mt-4">
            <DefaultButton full={true} onClick={verifyUsers}>Verify Users</DefaultButton>
          </div> :
          ""
        }
        {currentEvent ? 
          <EventDetails event={currentEvent} mintData={mintData}/> : 
          ""
        }
      </div> 
  
    </div>
  )
}