import { bebas } from "@/app/ui/fonts";

export enum EventOverType {
  CommitOver,
  ClaimOver,
  Rejected
}

export function EventOver({eventOverType}: {eventOverType: EventOverType}) {
  return (
    <h3 className={`${bebas.className} text-white text-md w-full text-center`}>
      {
        eventOverType === EventOverType.ClaimOver ?
          "Sorry, the event is over. You can no longer claim back the commitment fees." :
        eventOverType === EventOverType.CommitOver ?
          "The event is over. You can no longer commit to the event." :
          "Your commitment has been rejected."
      }
    </h3>
  )
}