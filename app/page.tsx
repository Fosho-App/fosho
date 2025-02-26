'use client'

import Logo from "./ui/logo";

import { SecondaryButton } from "./ui/buttons";
import { bebas, inter } from "./ui/fonts";
import WalletButton from "./ui/wallet-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {publicKey} = useWallet()
  const router = useRouter()

  if (publicKey) {
    router.push('./community')
  }

  return (
    <div className="m-auto h-screen max-w-[480px]">
      <div className="w-full h-[60%] relative inline-block overflow-hidden">
        <img src="./images/home.png" alt="" className="absolute block top-0 left-0"/>
      </div>
      <div className="mx-8 mt-8 flex flex-col gap-4">
        <Logo />
        <h2 className={`${bebas.className} text-3xl`}>
          your gateway to Solana Events <br />
          Commit, Earn, Influence <br />
          Feel the FOMO
        </h2>
      </div>
      <div className={`${inter.className} flex mx-8 mt-8 gap-4`}>
        <WalletButton />
        <SecondaryButton>Learn More</SecondaryButton>
      </div>
    </div>
  );
}
