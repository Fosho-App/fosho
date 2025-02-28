import { EventInfo } from "@/app/plugin/client";
import BriefEvent from "./brief-event";
import { useEffect, useState } from "react";

export default function EventsSet(
  {events, onClick}: 
  {events: EventInfo[], onClick: (s: string) => void}
) {
  const [showPastEvents, setShowPastEvents] = useState(false)
  const [eventsToShow, setEventsToShow] = useState<EventInfo[]>([])

  useEffect(() => {
    if (showPastEvents) {
      setEventsToShow(events)
    } else {
      setEventsToShow(events.filter(
        (event) => !event.eventEndsAt  || event.eventEndsAt && event.eventEndsAt > Date.now())
      )
    }
  }, [showPastEvents, events])

  return (
    <div className="">
      {eventsToShow.map((event) => (
        <div key={event.nonce}>
          <BriefEvent event={event} onClick={onClick}/>
        </div>
      ))}
      {events.length > eventsToShow.length &&
        <div className="w-full text-center mb-12">
          <button
            className="mt-4 px-4 py-2 bg-background-main rounded-lg text-white"
            onClick={() => setShowPastEvents(!showPastEvents)}
          >
            {showPastEvents ? "Hide Inactive Events" : "Show Inactive Events"}
          </button>
        </div>
      }
    </div>
  )
}