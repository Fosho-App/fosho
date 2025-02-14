
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {Program} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { PublicKey } from "@solana/web3.js"
import { mplCoreProgramKey } from "../utils"
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token"

export function useJoinEvent(client: Program<FoshoProgram>, community: PublicKey, event: PublicKey) {
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
          community,
          event,
          eventAuthority: null,
          attendee: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplCoreProgram: mplCoreProgramKey
        }).rpc()
        
      return tx
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
          queryKey: ['get-events', {community: community.toBase58()}]
      })     
    }
  })
}