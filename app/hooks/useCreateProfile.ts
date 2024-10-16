
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation } from "@tanstack/react-query"
import createProfile from "../actions/createProfile"

export function useCreateProfile(
  // user?: PublicKey
) {
  // const {connection} = useConnection()
  const wallet = useWallet()
  // const client = useQueryClient()

  return useMutation({
    mutationKey: ["create-user-profile", {publicKey: wallet.publicKey}],
    mutationFn: async() => {

      if (!wallet.publicKey) {
          return null
      }

      createProfile()
      console.log("I have called createProfile")

      return 
    },
    // onSuccess: async() => {
    //   await client.resetQueries({
          
    //   })     
      
    //   await client.invalidateQueries({
          
    //   })
    // }
})
}