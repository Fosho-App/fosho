
import { useWallet } from "@solana/wallet-adapter-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EventData } from "../community/[community]/events/create/page"
import {Program, BN, utils} from "@coral-xyz/anchor"
import { FoshoProgram } from "../plugin/fosho_program"
import { useGetCommunity } from "./useCommunity"
import { PublicKey } from "@solana/web3.js"

export function useCreateEvent(client: Program<FoshoProgram>, communityKey: string) {
  const wallet = useWallet()
  const communityData = useGetCommunity(client, communityKey).data
  const queryClient = useQueryClient()

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
        new PublicKey(communityKey).toBytes(),
        new BN(communityData.eventsCount).toArrayLike(Buffer, "le", 4)
      ], client.programId)

      const rewardAccount = eventData.rewardMint ? utils.token.associatedAddress({
        mint: new PublicKey(eventData.rewardMint), 
        owner: eventKey
      }) : null

      const { 
        name, 
        description, 
        commitmentFee, 
        eventEndsAt,
        eventStartsAt, 
        registrationEndsAt,
        registrationStartsAt, 
        rewardAmount, 
        rewardDecimal,
        location,
        capacity,
        organizer
      } = eventData

      console.log(
        Date.now(),
        eventStartsAt,
        eventEndsAt,
        registrationStartsAt,
        registrationEndsAt,
        eventStartsAt > registrationEndsAt
      )

      const tx = await client.methods.createEvent(
        name,
        "",
        { inPerson: {}},
        organizer,
        commitmentFee,
        new BN(eventStartsAt/1000),
        new BN(eventEndsAt/1000),
        new BN(registrationStartsAt/1000),
        new BN(registrationEndsAt/1000),
        new BN(capacity),
        location,
        null,
        description,
        { regular: {}},
        rewardAmount && rewardDecimal ? new BN(parseFloat(rewardAmount)*Math.pow(10,rewardDecimal)) : new BN(0),
        [],
        false
      ).accountsPartial({
        community: communityKey,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
        rewardAccount,
        rewardMint: eventData.rewardMint,
        senderAccount
      }).rpc()

      return {tx, eventKey: eventKey.toBase58()}
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['get-events', {community: communityKey}]
      })   
    }
  })
}