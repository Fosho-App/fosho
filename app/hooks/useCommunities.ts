import { useQuery } from "@tanstack/react-query"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { PublicKey } from "@solana/web3.js"

const verifiedCommunities = [
  "5zGwntzt9hkyHAgchKyM9ArsgWs44Cza2a88aXQ2mnF8"
]

export function useGetCommunities(client: Program<FoshoProgram>) {
  return useQuery({
    queryKey: ['get-communities'],
    queryFn: async() => {
      try {
        const communities = await client.account.community.fetchMultiple(verifiedCommunities)
        console.log("communities fetched.")
        return communities.map((community, index) => 
          ({...community, publicKey: new PublicKey(verifiedCommunities[index])})
        )
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}