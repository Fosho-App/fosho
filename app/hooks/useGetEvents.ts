import { useQuery } from "@tanstack/react-query"
import { EventInfo, getEvents } from "../plugin/client"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { useGetCommunity } from "./useCommunity"
import { PublicKey } from "@solana/web3.js"
import { Umi } from "@metaplex-foundation/umi"

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

        const eventsWithMetas = events.map(e => ({...e, title: "hello", description: "nothing"}))
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