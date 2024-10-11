'use client'

import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

const WalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

export const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const endpoint = process.env.NEXT_PUBLIC_MAINNET_RPC as string;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[
        new SolflareWalletAdapter(), 
        new PhantomWalletAdapter()
      ]} autoConnect={true}>
        <WalletModalProviderDynamic>
          {children}
        </WalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  )
}