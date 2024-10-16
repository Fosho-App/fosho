'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { ellipsify } from "./utils";

function WalletButton() {
  const {publicKey} = useWallet()

  return (
    <div>
      <WalletMultiButton>
        <span className="text-black">
          {publicKey ? 
            ellipsify(publicKey.toBase58()) : 
            "Connect Wallet"
          }
        </span>
      </WalletMultiButton>
    </div>   
  )
}

export function WalletButtonTop() {
  const {publicKey} = useWallet()

  return (
    <div>
      <WalletMultiButton className="wallet-adapter-button-top">
        <span className="text-black">
          {publicKey ? 
            ellipsify(publicKey.toBase58()) : 
            "Connect Wallet"
          }
        </span>
      </WalletMultiButton>
    </div>   
  )
}

export default WalletButton