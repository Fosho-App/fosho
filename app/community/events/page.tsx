'use client'

import Event from "@/app/ui/event"
import IslandDaoEvent from "@/app/ui/event/island-dao"
import { bigShouldersText, inter } from "@/app/ui/fonts"
import WalletButton from "@/app/ui/wallet-button"
import { BsTwitterX } from "react-icons/bs"
import { FaTelegramPlane } from "react-icons/fa"

export default function Profile() {
  return (
    <div className="bg-[#cdedce] text-primary-green p-2 min-h-screen">
      <div className="flex items-center justify-between">
        <img src="/images/islanddao-fosho.png" width={63} height={20}/>
        <img src="/images/islanddao-logo-1.png" width={23}/>
        <WalletButton />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="">
          <img src="/images/islanddao-logo-2.png" width={250}/>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className={`${bigShouldersText.className} text-3xl font-bold uppercase`}>Island Dao</h1>
          <p className={`${inter.className} text-xs mr-12 font-normal`}>
            IslandDAO will be hosted at a massive villa near the beachfront that we have converted into...
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
          <div className="socials flex gap-4">
            <div className="bg-gradient-to-b from-[#F3FFF5] to-[#BDEBC4] rounded-full p-2">
              <BsTwitterX className="text-sm"/>
            </div>
            <div className="bg-gradient-to-b from-[#F3FFF5] to-[#BDEBC4] rounded-full p-2">
              <FaTelegramPlane />
            </div>
            <div className="bg-gradient-to-b from-[#F3FFF5] to-[#BDEBC4] rounded-full p-2">
              <img src="/images/islanddao-realms.png" width={16} height={16}/>
            </div>
          </div>
          <div className="text-white bg-gradient-to-b from-[#73A584] to-[#062310] rounded-2xl py-2 px-4 text-sm">Claim Rewards</div>
        </div>
        <div className="mt-4">
          <IslandDaoEvent />
          <IslandDaoEvent />
        </div>
    </div>
  )
}