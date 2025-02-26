'use client'

import { useClaimRewards } from "@/app/hooks/useClaimRewards"
import { useGetAttendeesForUser } from "@/app/hooks/useGetAttendee"
import { useGetEvents } from "@/app/hooks/useGetEvents"
import { AttendeeInfo } from "@/app/plugin/client"
import { ClientContext, ClientContextType } from "@/app/providers/client-provider"
import { Commitment } from "@/app/ui/events/commitment"
import { BebasH2Heading } from "@/app/ui/heading"
import { ellipsify } from "@/app/utils"
import { PublicKey } from "@solana/web3.js"
import { useContext } from "react"

export default function Commitments(
  {communityKey}: 
  {communityKey: string}
) {
  const {client, umi} = useContext(ClientContext) as ClientContextType
  const events = useGetEvents(client, umi, communityKey).data
  const commits = useGetAttendeesForUser(client, communityKey).data
  const claimableCommits = commits ? commits.filter(commit => commit.status.verified) : []
  const unclaimableCommits = commits ? commits.filter(commit => !commit.status.verified) : []
  const allCommits = [...claimableCommits, ...unclaimableCommits]

  const {mutateAsync, isPending} = useClaimRewards(client, new PublicKey(communityKey))

  function getEventName(eventKey: string) {
    const event = events?.find(event => event.publicKey.toBase58() === eventKey)
    return event ? event.name : ellipsify(eventKey)
  }

  async function claimRewards(attendee: AttendeeInfo) {
    await mutateAsync([{
      event: attendee.event,
      attendeeRecord: attendee.publicKey,
      rewardMint: events?.find(event => event.publicKey.equals(attendee.event))?.rewardMint ?? null
    }])
  }

  return (
    <div className="">
      <BebasH2Heading title="My Commitments" />
      <div className="">
        {
        allCommits ?
          allCommits.map(commit => (
          <Commitment 
            key={commit.publicKey.toBase58()} 
            attendee={commit} 
            getEventName={getEventName}
            claimReward={claimRewards}
            disabled={isPending}
          />
        )) : ""
        }
      </div>
    </div>
  )
}