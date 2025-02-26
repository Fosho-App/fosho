
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {Program, utils} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { PublicKey, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token"
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from "@solana/spl-token"
import { getEventCollectionKey } from "../plugin/client"

type CommitmentSet = {
  event: PublicKey,
  attendeeRecord: PublicKey,
  rewardMint: PublicKey | null
}

export function useClaimRewards(
  client: Program<FoshoProgram>, 
  community: PublicKey, 
) {
  const wallet = useWallet()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["claim-rewards", {event, publicKey: wallet.publicKey}],
    mutationFn: async(commitmentSet: CommitmentSet[]) => {
      if (!wallet.publicKey) {
        return null
      }

      const recentBlockhash = await client.provider.connection.getLatestBlockhash({
        commitment: "confirmed"
      })

      const txs: VersionedTransaction[] = []

      for (const commitment of commitmentSet) {
        const {event, attendeeRecord, rewardMint} = commitment

        const rewardAccount = rewardMint ? utils.token.associatedAddress({mint: rewardMint, owner: event}) : null
        const receiverAccount = rewardMint ? utils.token.associatedAddress({mint: rewardMint, owner: wallet.publicKey}) : null

        const receiverAccountExists = receiverAccount ? 
          await client.provider.connection.getAccountInfo(receiverAccount) :
          null

        const ixs: TransactionInstruction[] = []

        if (!receiverAccountExists && receiverAccount && rewardMint) {
          const ix = createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            receiverAccount,
            wallet.publicKey,
            rewardMint,
            TOKEN_PROGRAM_ID
          )

          ixs.push(ix)
        }

        const claimIx = await client.methods.claimRewards().
        accountsPartial({
          community,
          event,
          attendeeRecord,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          eventCollection: getEventCollectionKey(event)[0],
          claimer: wallet.publicKey,
          rewardAccount,
          receiverAccount,
          rewardMint: rewardMint ?? null
        }).instruction()

        ixs.push(claimIx)

        const txMessage = new TransactionMessage({
          payerKey: wallet.publicKey,
          instructions: ixs,
            recentBlockhash: recentBlockhash.blockhash
        }).compileToV0Message()
    
        const tx = new VersionedTransaction(txMessage)
        txs.push(tx)
      }

      const signedTxs = await wallet.signAllTransactions!(txs)

      for (const signedTx of signedTxs) {
        const sig = await client.provider.connection.sendRawTransaction(signedTx.serialize(), {
          skipPreflight: false,
          maxRetries: 0,
        })

        await client.provider.connection.confirmTransaction(
          {
            signature: sig,
            blockhash: recentBlockhash.blockhash,
            lastValidBlockHeight: recentBlockhash.lastValidBlockHeight,
          },
          "confirmed"
        );
      }
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['get-attendees-for-user', {user: wallet.publicKey?.toBase58()}],
      })
      await queryClient.invalidateQueries({
        queryKey: ['get-pending-attendees-for-user', {user: wallet.publicKey?.toBase58()}],
      })  
    }
  })
}