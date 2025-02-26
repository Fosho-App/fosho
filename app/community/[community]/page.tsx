'use client'

import { useGetCommunity } from "@/app/hooks/useCommunity"
import { useGetAttendeesForUser, useGetPendingAttendeesForUser } from "@/app/hooks/useGetAttendee"
import { useGetEvents } from "@/app/hooks/useGetEvents"
import { ClientContext, ClientContextType } from "@/app/providers/client-provider"
import { DefaultButton, EventButton } from "@/app/ui/buttons"
import EventHeader from "@/app/ui/events/header"
import SocialLinks from "@/app/ui/events/socials"
import FooterNav from "@/app/ui/navs/footer-nav"
import MainNav from "@/app/ui/navs/main-nav"
import { useWallet } from "@solana/wallet-adapter-react"
import { useParams, useRouter } from "next/navigation"
import { useContext, useState } from "react"
import EventsSet from "@/app/ui/events/events-set"
import Commitments from "./commitments"
import { AttendeeInfo } from "@/app/plugin/client"
import { useClaimRewards } from "@/app/hooks/useClaimRewards"
import { PublicKey } from "@solana/web3.js"

export default function Events() {
  const router = useRouter()
  const params = useParams()
  const {publicKey} = useWallet()
  const {client, umi} = useContext(ClientContext) as ClientContextType
  const [showCommitments, setShowCommitments] = useState(false)

  const communityKey = typeof params.community === "string" ? params.community : ""
  
  const community = useGetCommunity(client, communityKey).data
  const events = useGetEvents(client, umi, communityKey)
  const activeEventsCount = events.data?.filter(
    (event) => event.registrationEndsAt && event.registrationEndsAt > Date.now()
  ).length

  const commitsForUser = useGetAttendeesForUser(client, communityKey).data
  const pendingAttendeesForUser = useGetPendingAttendeesForUser(client, communityKey).data
  const {
    mutateAsync: claimRewardsAsync, 
    isPending: claimRewardsPending
  } = useClaimRewards(client, new PublicKey(communityKey))

  function onClick(key: string) {
    router.push(`/community/${communityKey}/events/${key}`)
  }

  async function claimRewards() {
    const commitments = pendingAttendeesForUser ?
      pendingAttendeesForUser.map((attendee: AttendeeInfo) => ({
        event: attendee.event,
        attendeeRecord: attendee.publicKey,
        rewardMint: events.data?.find(event => event.publicKey.equals(attendee.event))?.rewardMint ?? null
      })) :
      []

    await claimRewardsAsync(commitments)
  }
  
  return (
    <div>
      <div className="bg-black text-white p-2 min-h-screen">
        <MainNav />
        <EventHeader />
        <div className="mt-4 flex justify-between items-center px-2">
          <SocialLinks />
          {pendingAttendeesForUser?.length ? 
            <DefaultButton onClick={claimRewards} disabled={claimRewardsPending}>
              {claimRewardsPending ? 'Claiming' : 'Claim Rewards'}
            </DefaultButton> : 
          null}
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
          <EventButton selected={true} onClick={() => setShowCommitments(false)}>
            <div className="flex gap-2">
              Events
              {activeEventsCount ? 
                <p className="bg-fosho-red text-white rounded-full">
                  <span className="p-2 text-xs">
                    {activeEventsCount}
                  </span>
                </p>
              : ""}
            </div>
            
            </EventButton>
          <EventButton selected={false} onClick={() => setShowCommitments(true)}>
            <div className="flex gap-2">
              Commitments
              {commitsForUser?.length ? 
                <p className="bg-background-second text-white rounded-full">
                  <span className="p-2 text-xs">
                    {commitsForUser.length}
                  </span>
                </p>
              : ""}
            </div>
          </EventButton>
        </div>
        {showCommitments ?
          <Commitments communityKey={communityKey} /> :
          <div className="mt-4 mb-12">
            {
              events.isFetching ?
                <p className="w-full text-center">Fetching events</p> :
              events.isFetched && events.data ?
                <EventsSet events={events.data} onClick={onClick} /> :
                <p className="w-full text-center">Fetch Failed. Please refresh</p>
            }
          </div>
        }
      </div>
      <FooterNav selectedOption={1} />
    </div>
  )
}