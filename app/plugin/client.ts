import { AnchorProvider, Program, BN } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./fosho_program.json";
import {FoshoProgram} from "./fosho_program";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { IdlTypes } from "@coral-xyz/anchor";

// const programId = new PublicKey("5ojhS89XpkvrSyagCddG7fv4wh2ffx8kVA6ABDYttZdN");
type CommunityInfo = IdlTypes<FoshoProgram>["community"];
type EventInfoWoPubkey = IdlTypes<FoshoProgram>["event"];
export interface EventInfo extends EventInfoWoPubkey { publicKey: PublicKey};

export function createClient(connection: Connection, wallet: AnchorWallet) {
  const provider = new AnchorProvider(connection, wallet, {})
  
  return new Program<FoshoProgram>(
    idl as FoshoProgram, 
    provider
  )
}

export async function getEvents(
  program: Program<FoshoProgram>,
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
    events.push({...event, publicKey: eventKey})
  }

  return events

}