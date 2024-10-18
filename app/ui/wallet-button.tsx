'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { ellipsify } from "../utils";

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

export function WalletButtonProfile() {
  const {publicKey} = useWallet()

  return (
    <div>
      <WalletMultiButton style={{
        background: "transparent", 
        color: "#9A9A9A", 
        fontWeight: 400, 
        fontSize: "13px",
        border: "1px solid #414141",
      }}>
        {publicKey? ellipsify(publicKey.toBase58()) : "Connect Wallet"}
      </WalletMultiButton>
    </div>   
  )
}

export function WalletButtonEvent() {
  const {publicKey} = useWallet()

  return (
    <div>
      <WalletMultiButton style={{
        background: "linear-gradient(to bottom, #DBFCE1, #BDEBC4)",
        padding: "6px 16px",
        color: "#000000", 
        fontWeight: 500, 
        fontSize: "13px",
        border: "1px solid #73A584",
      }}>
        {publicKey? ellipsify(publicKey.toBase58()) : "Connect Wallet"}
      </WalletMultiButton>
    </div>   
  )
}

export default WalletButton