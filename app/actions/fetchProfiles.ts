'use server'

import {sql} from "@vercel/postgres";

async function fetchProfilesHandler(
  walletAddress: string[]
) {
  if (!walletAddress.every(address => typeof address === 'string')) {
    throw new Error("invalid request");
  }

  const data = await sql.query(`
    SELECT profiles.name, profiles.wallet
    FROM profiles
    WHERE profiles.wallet in (${walletAddress.map((address) => `'${address}'`).join(',')})`
  )

  return data.rows.map((row) => {
    return {
      name: row.name,
      wallet: row.wallet
    }
  })
}

export default fetchProfilesHandler;