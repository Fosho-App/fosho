'use server'

import { PublicKey } from "@solana/web3.js";
import {sql} from "@vercel/postgres";
import { ProfileData } from "../profile/page";
import nacl from "tweetnacl";

async function fetchProfileHandler(
  walletAddress: string,
  message: string,
  signedMessage: string
): Promise<ProfileData> {

  try {
    const messageType = message.substring(0, 13);
    const timestamp = parseInt(message.substring(14))
    const currentTime = Math.floor(Date.now()/1000);

    if (messageType !== "fetch profile") {
      throw "invalid request";
    }

    if (timestamp > currentTime + 20 || timestamp < currentTime - 20) {
      throw "invalid request";
    }

    const parsedSignedMsg = JSON.parse(signedMessage).data ?
      Uint8Array.from(JSON.parse(signedMessage).data) :
      Uint8Array.from(Object.values(JSON.parse(signedMessage)))

    const result = nacl.sign.detached.verify(
      Uint8Array.from(Buffer.from(message, 'utf-8')),
      parsedSignedMsg,
      Uint8Array.from(new PublicKey(walletAddress).toBuffer())
    );

    if (!result) {
      throw "signature verification failed"
    }
  
    const data = await sql`
      SELECT profiles.name, profiles.twitter, profiles.telegram, profiles.about
      FROM profiles
      WHERE profiles.wallet=${walletAddress}
    `

    return {
      name: data.rows[0].name,
      telegram: data.rows[0].telegram,
      twitter: data.rows[0].twitter,
      about: data.rows[0].about
    }
  } catch(e) {
    console.log(e)
    return {
      name: null,
      telegram: null,
      twitter: null,
      about: null
    }
  }
}

export default fetchProfileHandler;