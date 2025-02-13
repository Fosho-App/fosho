import { useQuery } from "@tanstack/react-query"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"

export function useGetCommunities(client: Program<FoshoProgram>) {
  return useQuery({
    queryKey: ['get-communities'],
    queryFn: async() => {
      try {
        const communities = await client.account.community.all()
        console.log("communities fetched.")
        return communities
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}