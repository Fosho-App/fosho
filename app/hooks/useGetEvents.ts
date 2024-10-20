import { useQuery } from "@tanstack/react-query"
import { EventInfo, getEvents } from "../plugin/client"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { communityKey } from "../utils"
import fetchEventsHandler from "../actions/fetchEvent"
import { useGetCommunity } from "./useCommunity"

export interface EventInfoWithMeta extends EventInfo {
  title: string | null,
  description: string | null
}

export function useGetEvents(client: Program<FoshoProgram>) {
  const communityData = useGetCommunity(client).data

  return useQuery({
    enabled: communityData !== undefined,
    queryKey: ['get-events', {community: communityKey}],
    queryFn: async() => {
      if (!communityData) {
        return null
      }

      try {
        const events = await getEvents(client, communityKey, communityData)
        console.log("fetched event infos")

        const eventAddresses = events.map(e => e.publicKey.toBase58())
        const eventMetas = await fetchEventsHandler(eventAddresses)
        console.log("fetched event metas")

        const eventsWithMetas: EventInfoWithMeta[] = events.map(event => {
          const meta = eventMetas.find(m => m.eventAddress === event.publicKey.toBase58())

          return {...event, ...meta!}
        })

        return eventsWithMetas
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}