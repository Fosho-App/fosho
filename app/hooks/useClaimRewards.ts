
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {Program, utils} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { PublicKey } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token"

export function useClaimRewards(
  client: Program<FoshoProgram>, 
  community: PublicKey, 
  event: PublicKey,
  attendeeRecord: PublicKey,
  rewardMint: PublicKey | null
) {
  const wallet = useWallet()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["claim-rewards", {event, publicKey: wallet.publicKey}],
    mutationFn: async() => {
      if (!wallet.publicKey) {
        return null
      }

      const rewardAccount = rewardMint ? utils.token.associatedAddress({mint: rewardMint, owner: event}) : null
      const receiverAccount = rewardMint ? utils.token.associatedAddress({mint: rewardMint, owner: wallet.publicKey}) : null

      const tx = await client.methods.claimRewards().
        accountsPartial({
          community,
          event,
          attendeeRecord,
          tokenProgram: TOKEN_PROGRAM_ID,
          rewardAccount,
          receiverAccount,
          rewardMint: rewardMint ?? null
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