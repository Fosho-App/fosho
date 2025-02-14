'use client'

import { useGetCommunity } from "@/app/hooks/useCommunity"
import { useGetPendingAttendeesForUser } from "@/app/hooks/useGetAttendee"
import { useGetEvents } from "@/app/hooks/useGetEvents"
import { ClientContext, ClientContextType } from "@/app/providers/client-provider"
import { DefaultButton, EventButton } from "@/app/ui/buttons"
import EventHeader from "@/app/ui/events/header"
import BriefEvent from "@/app/ui/events/island-dao"
import SocialLinks from "@/app/ui/events/socials"
import FooterNav from "@/app/ui/navs/footer-nav"
import MainNav from "@/app/ui/navs/main-nav"
import { useWallet } from "@solana/wallet-adapter-react"
import { useParams, useRouter } from "next/navigation"
import { useContext } from "react"

export default function Events() {
  const router = useRouter()
  const params = useParams()
  const {publicKey} = useWallet()
  const {client, umi} = useContext(ClientContext) as ClientContextType

  const communityKey = typeof params.community === "string" ? params.community : ""
  
  const community = useGetCommunity(client, communityKey).data
  const events = useGetEvents(client, umi, communityKey)
  const activeEventsCount = events.data?.filter(
    (event) => event.registrationEndsAt && event.registrationEndsAt > Date.now()
  ).length

  const pendingAttendeesForUser = useGetPendingAttendeesForUser(client).data

  function onClick(key: string) {
    router.push(`/community/${communityKey}/events/${key}`)
  }
  
  return (
    <div>
      <div className="bg-black text-white p-2 min-h-screen">
        <MainNav />
        <EventHeader />
        <div className="mt-4 flex justify-between items-center px-2">
          <SocialLinks />
          {pendingAttendeesForUser?.length ? <DefaultButton>Claim Rewards</DefaultButton> : null}
        </div>
        {
          publicKey && community?.authority.equals(publicKey) ?
          <div className="w-full mt-4 px-4" 
            onClick={() => router.push(`/community/${communityKey}/events/create`)}
          >
            <DefaultButton full={true}>Create Event</DefaultButton>
          </div> :
          ""
        }
        <div className="flex w-full mt-4 px-2 gap-4">
          <EventButton selected={true}>
            <div className="flex gap-2">
              Events
              {activeEventsCount ? 
                <p className="bg-fosho-red text-white rounded-full">
                  <span className="p-2 text-sm">
                    {activeEventsCount}
                  </span>
                </p>
              : ""}
            </div>
            
            </EventButton>
          <EventButton selected={false}>Commitments</EventButton>
        </div>
        <div className="mt-4 mb-12">
          {
            events.isFetching ?
              "Fetching events" :
              events.isFetched && events.data ?
                events.data.map((event) => (
                  <div key={event.nonce}>
                    <BriefEvent event={event} onClick={onClick}/>
                  </div>
                )) :
              "Fetch Failed. Please refresh"
          }
        </div>
      </div>
      <FooterNav selectedOption={1} />
    </div>
  )
}