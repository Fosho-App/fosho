'use client'

import { AnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ReactNode, createContext } from "react";
import { createClient } from "../plugin/client";
import {Program} from "@coral-xyz/anchor";
import { FoshoProgram } from "../plugin/fosho_program";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Umi } from "@metaplex-foundation/umi";

export type ClientContextType = {
  client: Program<FoshoProgram>
  umi: Umi
}

export const ClientContext = createContext<ClientContextType | null>(null)

export function ClientProvider({children}: {children: ReactNode}) {
  const {connection} = useConnection()
  const wallet = useWallet()
  const walletContext = wallet.publicKey ? wallet : {}
  const client = createClient(connection, walletContext as AnchorWallet)
  const umi = createUmi(connection.rpcEndpoint)

  return (
    <ClientContext.Provider value={{client, umi}}>
        {children}
    </ClientContext.Provider>
  )
}