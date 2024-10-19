import { useQuery } from "@tanstack/react-query"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { communityKey } from "../utils"

export function useGetCommunity(client: Program<FoshoProgram>) {
  return useQuery({
    queryKey: ['get-community', {community: communityKey}],
    queryFn: async() => {
      try {        
        const communityData = await client.account.community.fetch(communityKey)
        console.log("community data fetched.")
        return communityData
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}