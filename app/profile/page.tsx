'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import { useGetCivicIdentity } from "../hooks/useCivicIdentity";
import Logo from "../ui/logo";
import WalletButton from "../ui/wallet-button";


export default function Profile() {
  const {publicKey} = useWallet()

  return (
    <div className="">
      <div className="flex justify-between m-2 items-center">
        <Logo />
        <WalletButton />
      </div>
    </div>
  )
}