import { useQuery } from "@tanstack/react-query"
import { EventInfo, getEventCollectionKey, getEvents, parseEvents } from "../plugin/client"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { useGetCommunity } from "./useCommunity"
import { PublicKey } from "@solana/web3.js"
import { publicKey, Umi } from "@metaplex-foundation/umi"
import { fetchCollectionV1 } from "@metaplex-foundation/mpl-core"

export function useGetEvents(client: Program<FoshoProgram>, umi: Umi, communityKey: string) {
  const communityData = useGetCommunity(client, communityKey).data

  return useQuery({
    enabled: communityData !== undefined,
    queryKey: ['get-events', {community: communityKey}],
    queryFn: async(): Promise<EventInfo[] | null> => {
      if (!communityData) {
        return null
      }

      try {
        const communityAddress = new PublicKey(communityKey)
        const events = await getEvents(client, umi, communityAddress, communityData)
        console.log("fetched event infos")

        return events
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}

export function useGetEvent(client: Program<FoshoProgram>, umi: Umi, eventKey: string) {
  return useQuery({
    queryKey: ['get-event', {event: eventKey}],
    queryFn: async(): Promise<EventInfo | null> => {
      try {
        const event = await client.account.event.fetch(new PublicKey(eventKey))
        console.log("fetched event: ", event)
        const [nftKey] = getEventCollectionKey(new PublicKey(eventKey))
        const coreData = await fetchCollectionV1(umi, publicKey(nftKey))
        const eventData = parseEvents(event, new PublicKey(eventKey), coreData)
        return eventData
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}