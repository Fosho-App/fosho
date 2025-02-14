
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {Program} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { PublicKey } from "@solana/web3.js"

export function useVerifyUser(
  client: Program<FoshoProgram>, 
  community: PublicKey, 
  event: PublicKey,
  attendeeRecord?: PublicKey,
) {
  const wallet = useWallet()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["verify-user", {event, attendeeRecord}],
    mutationFn: async(
      {acceptAttendee, owner} : 
      {acceptAttendee: boolean, owner: PublicKey}
    ) => {
      if (!wallet.publicKey || !attendeeRecord) {
        return null
      }

      if (acceptAttendee) {
        const tx = await client.methods.verifyAttendee().
        accountsPartial({
          community,
          event,
          attendeeRecord,
          owner
        }).rpc()
        
        return tx
      } else {
        const tx = await client.methods.rejectAttendee().
        accountsPartial({
          community,
          event,
          attendeeRecord,
          owner
        }).rpc()
        
        return tx
      }
      
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
          queryKey: ['get-events', {community: community.toBase58()}]
      })     
    }
  })
}