import { useQuery } from "@tanstack/react-query"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { PublicKey } from "@solana/web3.js"

export function useGetCommunity(client: Program<FoshoProgram>, communityKey: string) {
  return useQuery({
    queryKey: ['get-community', {community: communityKey}],
    queryFn: async() => {
      try {
        const communityAddress = new PublicKey(communityKey)
        const communityData = await client.account.community.fetch(communityAddress)
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