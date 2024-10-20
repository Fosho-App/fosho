
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation } from "@tanstack/react-query"
import { EventData } from "../community/events/create/page"
import {Program, BN, utils} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { communityKey } from "../utils"
import { useGetCommunity } from "./useCommunity"
import { PublicKey } from "@solana/web3.js"
import createEventHandler from "../actions/createEvent"

export function useCreateEvent(client: Program<FoshoProgram>) {
  const wallet = useWallet()
  const communityData = useGetCommunity(client).data

  return useMutation({
    mutationKey: ["create-event", {publicKey: wallet.publicKey}],
    mutationFn: async(eventData: EventData) => {
      if (!wallet.publicKey || !communityData) {
        return null
      }

      const senderAccount = eventData.rewardMint ? utils.token.associatedAddress({
        mint: new PublicKey(eventData.rewardMint), 
        owner: wallet.publicKey
      }) : null

      const [eventKey] = PublicKey.findProgramAddressSync([
        Buffer.from("event"),
        communityKey.toBytes(),
        new BN(communityData.eventsCount).toArrayLike(Buffer, "le", 4)
      ], client.programId)

      const rewardAccount = eventData.rewardMint ? utils.token.associatedAddress({
        mint: new PublicKey(eventData.rewardMint), 
        owner: eventKey
      }) : null

      const tx = await client.methods.createEvent(
        eventData.maxAttendees,
        eventData.commitmentFee,
        new BN(eventData.eventDate/1000),
        new BN(eventData.registrationDate/1000),
        eventData.rewardMint ? eventData.rewardAmount : new BN(0)
      ).accountsPartial({
        community: communityKey,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
        rewardAccount,
        rewardMint: eventData.rewardMint,
        senderAccount
      }).rpc()

      await createEventHandler(eventData.name, eventData.description, eventKey.toBase58())

      return {tx, eventKey: eventKey.toBase58()}
    }
  })
}