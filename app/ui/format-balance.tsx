import {BN} from "@coral-xyz/anchor";
import { removeZeros } from "../utils";

type FormatBalanceProps = {
  decimals: number | undefined,
  weight: BN,
  name: string | null | undefined
}

export function FormatBalance({
  decimals,
  weight,
  name
}: FormatBalanceProps
) {
  const pow = decimals ? new BN(10).pow(new BN(decimals)) : new BN(1)
  const base = weight.div(pow)
  const decis = weight.mod(pow)
  const decisString = decimals ? decis.toString().padStart(decimals, "0") : decis.toString()

  return (
    <span>
      {base.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {decis.toNumber() !== 0 && "."}
      {removeZeros(decisString)}
       {name}
    </span>
  )
}