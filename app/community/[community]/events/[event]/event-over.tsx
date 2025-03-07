import { bebas } from "@/app/ui/fonts";

export enum EventOverType {
  CommitOver,
  ClaimOver,
  Rejected,
  Cancelled,
  Claimed
}

export function EventOver({eventOverType}: {eventOverType: EventOverType}) {
  return (
    <h3 className={`${bebas.className} text-white text-md w-full text-center`}>
      {
        eventOverType === EventOverType.ClaimOver ?
          "Sorry, the event is over. You can no longer claim back the commitment fees." :
        eventOverType === EventOverType.CommitOver ?
          "The event is over. You can no longer commit to the event." :
        eventOverType === EventOverType.Cancelled ?
          "You cannot re-commit to the event." :
        eventOverType === EventOverType.Claimed ?
          "You have already claimed the commitment fees." :
          "Your commitment has been rejected."
      }
    </h3>
  )
}