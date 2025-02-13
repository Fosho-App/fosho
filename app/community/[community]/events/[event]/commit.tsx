'use client'

import { useJoinEvent } from "@/app/hooks/useJoinEvent";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { DefaultButton } from "@/app/ui/buttons";
import { useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export default function JoinEvent(
  {eventKey, communityKey}: 
  {eventKey: PublicKey, communityKey: PublicKey}
  ) {
  const {client} = useContext(ClientContext) as ClientContextType
  const {mutateAsync, isPending, isError, error, isSuccess} = useJoinEvent(client, communityKey, eventKey)
  
  async function joinEvent() {
    await mutateAsync()
  }

  return (
    <div className="">
      <DefaultButton full={true} disabled={isPending || isSuccess} onClick={joinEvent}>
        {
          isPending ? "Committing" : 
          isSuccess ? "Committed Successfully" :
          "Commit to Event"
        }
      </DefaultButton>
      {
        isError && 
        <div className="text-sm my-2 text-center text-red-500">
          {error.message.slice(error.message.indexOf('Error Code') === -1 ? 0 : error.message.indexOf('Error Code'))}
        </div>
      }
    </div>
  )
}