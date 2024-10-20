'use client'

import { useJoinEvent } from "@/app/hooks/useJoinEvent";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { GradientButton } from "@/app/ui/buttons";
import { useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export default function JoinEvent({eventKey}: {eventKey: PublicKey}) {
  const {client} = useContext(ClientContext) as ClientContextType
  const {mutateAsync, isPending, isError, error, isSuccess} = useJoinEvent(client, eventKey)
  
  async function joinEvent() {
    await mutateAsync()
  }

  return (
    <div className="">
      <GradientButton full={true} disabled={isPending || isSuccess} onClick={joinEvent}>
        {
          isPending ? "Committing" : 
          isSuccess ? "Committed Successfully" :
          "Commit to Event"
        }
      </GradientButton>
      {
        isError && 
        <div className="text-sm my-2 text-center text-red-500">
          {error.message}
        </div>
      }
    </div>
  )
}