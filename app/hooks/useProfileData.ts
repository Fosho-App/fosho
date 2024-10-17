
import { useWallet } from "@solana/wallet-adapter-react"
import { useQuery } from "@tanstack/react-query"
import fetchProfileHandler from "../actions/fetchProfile"
import { decodeUTF8 } from "tweetnacl-util"

export function useGetProfileData() {
  const wallet = useWallet()

  return useQuery({
    queryKey: ['fetch-profile-data', {user: wallet.publicKey}],
    queryFn: async() => {   
      try {
        if (!wallet.publicKey || !wallet.signMessage) {
          return null
        }

        const message = `fetch profile ${Math.floor(Date.now()/1000)}`
        const messageBytes = decodeUTF8(message)

        const signedMsg = await wallet.signMessage(messageBytes)

        const profile = await fetchProfileHandler(
          wallet.publicKey.toBase58(),
          message,
          JSON.stringify(signedMsg)
        )
        
        console.log("current profile fetched.")
        return profile
      } catch {
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}