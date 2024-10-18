'use server'

import {sql} from "@vercel/postgres";

type EventMeta = {
  title: string | null,
  description: string | null,
  eventAddress: string
}

async function fetchEventsHandler(
  eventAddresses: string[],
): Promise<EventMeta[]> {

  const eventMetas: EventMeta[] = []

  for (const eventAddress of eventAddresses) {
    try {
      const data = await sql`
        SELECT events.title, events.description
        FROM events
        WHERE events.event_address=${eventAddress}
      `
      eventMetas.push({
        title: data.rows[0].title,
        description: data.rows[0].description,
        eventAddress
      })
    } catch(e) {
      console.log(e)
      eventMetas.push({
        title: null,
        description: null,
        eventAddress
      })
    }
  }

  return eventMetas
}

export default fetchEventsHandler;