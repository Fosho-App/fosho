'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ellipsify } from "./utils";

function WalletButton() {
  const {publicKey} = useWallet()

  return (
    <div>
      <WalletMultiButton>
        <span className="text-black text-xs">
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