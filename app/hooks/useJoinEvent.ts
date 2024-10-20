
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {Program} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { PublicKey } from "@solana/web3.js"
import { communityKey } from "../utils"

export function useJoinEvent(client: Program<FoshoProgram>, event: PublicKey) {
  const wallet = useWallet()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["join-event", {event, publicKey: wallet.publicKey}],
    mutationFn: async() => {
      if (!wallet.publicKey) {
        return null
      }

      const tx = await client.methods.joinEvent().
        accountsPartial({
          event
        }).rpc()
        
      return tx
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
          queryKey: ['get-events', {community: communityKey}]
      })     
    }
  })
}