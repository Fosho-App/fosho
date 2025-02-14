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

export function useGetAttendeesForEvent(client: Program<FoshoProgram>, event: string) {
  return useQuery({
    queryKey: ['get-attendees-for-event', {event}],
    queryFn: async() => {
      try {
        const attendeeRecords = await client.account.attendee.all([{
          memcmp: {
            offset: 8,
            bytes: event
          }
        }])

        console.log("Fetched attendee records for event: ", event)
        return attendeeRecords.map(record => ({...record.account, publicKey: record.publicKey}))
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}

export function useGetAttendeesForUser(client: Program<FoshoProgram>) {
  const {publicKey} = useWallet()
  const user = publicKey?.toBase58()

  return useQuery({
    queryKey: ['get-attendees-for-event', {user}],
    queryFn: async() => {
      if (!user) {
        return null
      }
      
      try {
        const attendeeRecords = await client.account.attendee.all([{
          memcmp: {
            offset: 40,
            bytes: user
          }
        }])

        console.log("Fetched attendee records for user: ", user)
        return attendeeRecords.map(record => ({...record.account, publicKey: record.publicKey}))
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}

export function useGetPendingAttendeesForUser(client: Program<FoshoProgram>) {
  const {publicKey} = useWallet()
  const user = publicKey?.toBase58()
  const attendeesForUser = useGetAttendeesForUser(client).data

  return useQuery({
    enabled: attendeesForUser !== undefined,
    queryKey: ['get-pending-attendees-for-user', {user}],
    queryFn: async() => {
      if (!user || !attendeesForUser) {
        return null
      }

      return attendeesForUser.filter(attendee => attendee.status.verified)
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}