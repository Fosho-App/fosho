import { AnchorProvider, Program, BN } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./fosho_program.json";
import {FoshoProgram} from "./fosho_program";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { IdlTypes } from "@coral-xyz/anchor";
import { CollectionV1, fetchCollectionV1 } from "@metaplex-foundation/mpl-core"
import { Umi, publicKey } from "@metaplex-foundation/umi";

// const programId = new PublicKey("5ojhS89XpkvrSyagCddG7fv4wh2ffx8kVA6ABDYttZdN");
type CommunityInfo = IdlTypes<FoshoProgram>["community"];
type AttendeeInfoWoKey = IdlTypes<FoshoProgram>["attendee"];
export interface AttendeeInfo extends AttendeeInfoWoKey { publicKey: PublicKey};
type EventInfoWoPubkey = IdlTypes<FoshoProgram>["event"];

export interface EventInfo extends EventInfoWoPubkey { 
  publicKey: PublicKey
  name: string
  eventType: string | null
  organizer: string
  eventStartsAt: number | null
  eventEndsAt: number | null
  registrationStartsAt: number | null
  registrationEndsAt: number | null
  cancellationOverAt: number | null
  capacity: number | null
  current: number
  location: string | null
  virtualLink: string | null
  description: string | null
};

const defaultValues = {
  organizer: "",
  name: "",
  eventType: "",
  eventStartsAt: null,
  eventEndsAt: null,
  registrationStartsAt: null,
  registrationEndsAt: null,
  cancellationOverAt: null,
  capacity: null,
  current: 0,
  location: null,
  virtualLink: null,
  description: null
}

export function getEventCollectionKey(event: PublicKey) {
  return PublicKey.findProgramAddressSync([
    Buffer.from("event"),
    event.toBuffer(),
    Buffer.from("collection")
  ], new PublicKey(idl.address))
}

export function getAttendeeKey(event: PublicKey, wallet: PublicKey) {
  return PublicKey.findProgramAddressSync([
    Buffer.from("attendee"),
    event.toBytes(),
    wallet.toBytes()
  ], new PublicKey(idl.address))
}

export function createClient(connection: Connection, wallet: AnchorWallet) {
  const provider = new AnchorProvider(connection, wallet, {})
  
  return new Program<FoshoProgram>(
    idl as FoshoProgram, 
    provider
  )
}

export function getEventTicketKey(event: PublicKey,owner: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("event"),
      event.toBuffer(),
      owner.toBuffer(),
      Buffer.from("ticket"),
    ],
    new PublicKey(idl.address)
  )[0]
}

export async function getEvents(
  program: Program<FoshoProgram>,
  umi: Umi,
  community: PublicKey,
  communityData: CommunityInfo
) {
  const events: EventInfo[] = [];

  for (let i = 0; i < communityData.eventsCount; i++) {
    const [eventKey] = PublicKey.findProgramAddressSync([
      Buffer.from("event"),
      community.toBuffer(),
      new BN(i).toArrayLike(Buffer, 'le', 4)
    ], 
      program.programId
    );

    const event = await program.account.event.fetch(eventKey)
    const [nftKey] = getEventCollectionKey(eventKey)
    const coreData = await fetchCollectionV1(umi, publicKey(nftKey))
    const eventWithDefaults = parseEvents(event, eventKey, coreData)
    events.push(eventWithDefaults)
  }

  return events.sort((a,b) => a.registrationStartsAt && b.registrationStartsAt ? b.registrationStartsAt - a.registrationStartsAt : -1)

}

export function parseEvents(
  event: EventInfoWoPubkey,
  eventKey: PublicKey,
  coreData: CollectionV1
) {
  const eventWithDefaults: EventInfo = {...event, ...defaultValues, publicKey: eventKey}

  if (coreData.attributes) {
    let attributes = coreData.attributes.attributeList
      .map(k => ({...k, key: k.key.replace(/\s/g, '')}))
    
    attributes = attributes.map(att => ({...att, key: att.key[0].toLowerCase()+att.key.slice(1)}))
    
    for (const attribute of attributes) {
      eventWithDefaults.eventType = attribute.key === "eventType" ? attribute.value : eventWithDefaults.eventType
      eventWithDefaults.organizer = attribute.key === "organizer" ? attribute.value : eventWithDefaults.organizer
      eventWithDefaults.eventStartsAt = attribute.key === "eventStartsAt" ? parseInt(attribute.value) * 1000 : eventWithDefaults.eventStartsAt
      eventWithDefaults.eventEndsAt = attribute.key === "eventEndsAt" ? parseInt(attribute.value) * 1000 : eventWithDefaults.eventEndsAt
      eventWithDefaults.registrationEndsAt = attribute.key === "registrationEndsAt" ? parseInt(attribute.value) * 1000 : eventWithDefaults.registrationEndsAt
      eventWithDefaults.registrationStartsAt = attribute.key === "registrationStartsAt" ? parseInt(attribute.value) * 1000 : eventWithDefaults.registrationStartsAt
      eventWithDefaults.cancellationOverAt = attribute.key === "cancellationOverAt" ? parseInt(attribute.value) * 1000 : eventWithDefaults.cancellationOverAt
      eventWithDefaults.capacity = attribute.key === "capacity" ? parseInt(attribute.value) : eventWithDefaults.capacity
      eventWithDefaults.location = attribute.key === "location" ? attribute.value : eventWithDefaults.location
      eventWithDefaults.virtualLink = attribute.key === "virtualLink" ? attribute.value : eventWithDefaults.virtualLink
      eventWithDefaults.description = attribute.key === "description" ? attribute.value : eventWithDefaults.description
    }
  }
  
  eventWithDefaults.name = coreData.name
  eventWithDefaults.current = coreData.currentSize

  return eventWithDefaults
}