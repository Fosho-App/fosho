'use server'

import nacl from "tweetnacl";
import { ProfileData } from "../profile/page";
import { PublicKey } from "@solana/web3.js";
import { sql } from "@vercel/postgres";

export default async function updateProfileHandler(
  profileData: ProfileData,
  message: string,
  signedMessage: string,
  walletAddress: string
) {
  const messageType = message.substring(0, 14);
  const timestamp = parseInt(message.substring(15))
  const currentTime = Math.floor(Date.now()/1000);
  
  if (messageType !== "update profile") {
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

  const currentData = await sql`
    SELECT 1 from profiles
    WHERE wallet=${walletAddress}
  `;

  const data = currentData.rowCount ?
    await sql`
      UPDATE profiles Set name=${profileData.name ?? ''}, twitter=${profileData.twitter ?? ''},
      telegram=${profileData.telegram ?? ''}, about=${profileData.about ?? ''}
      WHERE wallet=${walletAddress};` :
    await sql`
      INSERT into profiles (wallet, name, twitter, telegram, about)
      VALUES (${walletAddress}, ${profileData.name ?? ''}, ${profileData.twitter ?? ''}, ${profileData.telegram ?? ''},
      ${profileData.about ?? ''});
  `;
  
  return data.rowCount
}