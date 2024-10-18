'use client'

import { useGetEvents } from "@/app/hooks/useGetEvents"
import { ClientContext, ClientContextType } from "@/app/providers/client-provider"
import { GradientButton } from "@/app/ui/buttons"
import EventHeader from "@/app/ui/events/header"
import IslandDaoEvent from "@/app/ui/events/island-dao"
import SocialLinks from "@/app/ui/events/socials"
import { WalletButtonEvent } from "@/app/ui/wallet-button"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { BiTrophy } from "react-icons/bi"
import { IoDiamondOutline } from "react-icons/io5"
import { MdOutlineLocalActivity } from "react-icons/md"
import { PiSquaresFourBold } from "react-icons/pi"

export default function Events() {
  const router = useRouter()
  const {client} = useContext(ClientContext) as ClientContextType
  const events = useGetEvents(client)

  function onClick(key: string) {
    router.push(`./events/${key}`)
  }

  return (
    <div>
      <div className="bg-[#cdedce] text-primary-green p-2 min-h-screen">
        <div className="flex items-center justify-between">
          <img src="/images/islanddao-fosho.png" width={63} height={20}/>
          <img src="/images/islanddao-logo-1.png" width={23}/>
          <WalletButtonEvent />
        </div>
        <EventHeader />
        <div className="mt-4 flex justify-between items-center">
          <SocialLinks />
          <GradientButton>Claim Rewards</GradientButton>
        </div>
        <div className="mt-4 mb-12">
          {
            events.isFetching ?
              "Fetching events" :
              events.isFetched && events.data ?
                events.data.map((event) => (
                  <div key={event.nonce}>
                    <IslandDaoEvent event={event} onClick={onClick}/>
                  </div>
                )) :
              "Fetch Failed. Please refresh"
          }
        </div>
      </div>
      <div className="fixed bottom-0 h-12 bg-gradient-to-b from-[#DBFCE1] to-[#BDEBC4] 
        w-full md:w-[720px] flex items-center justify-evenly text-light-green text-3xl"
      >
        <div className=""><PiSquaresFourBold /></div>
        <div className="text-black"><MdOutlineLocalActivity /></div>
        <div className=""><BiTrophy /></div>
        <div className=""><IoDiamondOutline /></div>
      </div>
    </div>
  )
}