import { MintInfoType } from "@/app/hooks/useMintData";
import { EventInfo } from "@/app/plugin/client";
import { bebas } from "@/app/ui/fonts";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { FormatBalance } from "@/app/ui/format-balance";
import { useClaimRewards } from "@/app/hooks/useClaimRewards";
import { useContext } from "react";
import { ClientContext, ClientContextType } from "@/app/providers/client-provider";
import { DefaultButton } from "@/app/ui/buttons";
import { ellipsify } from "@/app/utils";

export default function ClaimRewards(
  {event, communityKey, mintData, attendeeRecordKey} : 
  {event: EventInfo, communityKey: PublicKey, mintData: MintInfoType | null | undefined, attendeeRecordKey: PublicKey}
) {

  const {client} = useContext(ClientContext) as ClientContextType

  const {mutateAsync, isPending, isError, error, isSuccess} = useClaimRewards(
    client, 
    communityKey, 
    event.publicKey,
    attendeeRecordKey,
    event.rewardMint
  )

  async function claimRewards() {
    await mutateAsync()
  }

  return (
    <div className="text-center">
      <h3 className={`${bebas.className} text-fosho-red text-md`}>
        you can claim
      </h3>
      <h2 className={`${bebas.className} text-white text-3xl mb-2`}>
        {event.rewardPerUser.gt(new BN(0)) ?
          <span>
            <FormatBalance
              decimals={mintData?.decimals} 
              weight={event.rewardPerUser} 
              name={mintData?.name ?? (mintData && ellipsify(mintData?.address.toBase58(),2,1))}
              customSize={true}
          /> + </span> : ""} {event.commitmentFee.toNumber()/LAMPORTS_PER_SOL} 
          <span className="text-xl ml-1">SOL</span>
      </h2>
      <DefaultButton full={true} disabled={isPending || isSuccess} onClick={claimRewards}>
        {
          isPending ? "Claiming" : 
          isSuccess ? "Claimed Successfully" :
          "Claim Rewards"
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