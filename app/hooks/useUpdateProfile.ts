
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileData } from "../profile/page"
import updateProfileHandler from "../actions/updateProfile"
import { decodeUTF8 } from "tweetnacl-util"

export function useUpdateProfile() {
  const wallet = useWallet()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ["create-user-profile", {publicKey: wallet.publicKey}],
    mutationFn: async(profileData: ProfileData) => {
      if (!wallet.publicKey || !wallet.signMessage) {
        return null
      }

      const message = `update profile ${Math.floor(Date.now()/1000)}`
      const messageBytes = decodeUTF8(message)

      const signedMsg = await wallet.signMessage(messageBytes)
      
      return await updateProfileHandler(
        profileData,
        message,
        JSON.stringify(signedMsg),
        wallet.publicKey.toBase58()
      )
    }
  })
}