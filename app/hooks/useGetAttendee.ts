import { useQuery } from "@tanstack/react-query"
import { FoshoProgram } from "../plugin/fosho_program"
import { Program } from "@coral-xyz/anchor"
import { PublicKey } from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"

export function useGetAttendee(client: Program<FoshoProgram>, eventKey?: PublicKey) {
  const {publicKey} = useWallet()

  return useQuery({
    queryKey: ['get-attendee-record', {event: eventKey, publicKey}],
    queryFn: async() => {
      if (!publicKey || !eventKey) {
        return null
      }

      try {
        const [attendeeKey] = PublicKey.findProgramAddressSync([
          Buffer.from("attendee"),
          eventKey.toBytes(),
          publicKey.toBytes()
        ], client.programId)

        const attendeeRecord = await client.account.attendee.fetch(attendeeKey)
        console.log("Fetched attendee record")
        return {...attendeeRecord, publicKey: attendeeKey}
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}

export function useGetOtherAttendee(client: Program<FoshoProgram>, attendeeKey?: string) {
  return useQuery({
    queryKey: ['get-attendee-record', {attendeeKey}],
    queryFn: async() => {
      if (!attendeeKey) {
        return null
      }

      try {
        const attendeeRecord = await client.account.attendee.fetch(attendeeKey)
        console.log("Fetched attendee record for key: ", attendeeKey)
        return {...attendeeRecord, publicKey: attendeeKey}
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}