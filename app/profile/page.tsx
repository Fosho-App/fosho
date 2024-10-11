'use client'

import Logo from "../ui/logo";
import WalletButton from "../ui/wallet-button";


export default function Profile() {
  return (
    <div className="">
      <div className="flex justify-between m-2 items-center">
        <Logo />
        <WalletButton />
      </div>
    </div>
  )
}