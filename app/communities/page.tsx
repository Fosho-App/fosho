'use client'

import { useContext } from "react"
import { useGetCommunities } from "../hooks/useCommunities"
import { BebasH2Heading } from "../ui/heading"
import MainNav from "../ui/navs/main-nav"
import { ClientContext, ClientContextType } from "../providers/client-provider"
import { inter } from "../ui/fonts"
import FooterNav from "../ui/navs/footer-nav"
import { useRouter } from "next/navigation"
import { PublicKey } from "@solana/web3.js"

export default function Communities() {
  const {client} = useContext(ClientContext) as ClientContextType
  const communities = useGetCommunities(client).data
  const router = useRouter()

  function goToCommunity(communityKey: PublicKey) {
    router.push(`/community/${communityKey.toBase58()}`)
  }

  return (
    <div className="m-3">
      <MainNav />
      <BebasH2Heading title="Communities" />
      {communities ?
        <div className="grid grid-cols-2 grid-flow-rows gap-2 mt-2">
          {communities.map(community => (
            <div 
              key={community.publicKey.toBase58()} 
              onClick={() => goToCommunity(community.publicKey)}
            >
              <img 
                src="/images/communities/islanddao.png" 
                alt={community.account.name}
                className="rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div> :
        <div className="mt-4">
          <h3 className={`${inter.className} text-sm`}>Loading communities..</h3>
        </div>
      }
      <FooterNav selectedOption={0} />
    </div>
  )
}