'use server'

import { sql } from "@vercel/postgres";

async function createEventHandler(
  title: string,
  description: string,
  eventAddress: string
) {
  const data = await sql`
    INSERT into events (title, description, event_address)
    VALUES (${title}, ${description}, ${eventAddress})
    ON CONFLICT (event_address) DO NOTHING;
  `;

  return data.rowCount
}

export default createEventHandler;