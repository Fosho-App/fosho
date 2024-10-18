'use client'

import { AnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ReactNode, createContext } from "react";
import { createClient } from "../plugin/client";
import {Program} from "@coral-xyz/anchor";
import { FoshoProgram } from "../plugin/fosho_program";

export type ClientContextType = {
  client: Program<FoshoProgram>
}

export const ClientContext = createContext<ClientContextType | null>(null)

export function ClientProvider({children}: {children: ReactNode}) {
  const {connection} = useConnection()
  const wallet = useWallet()
  const walletContext = wallet.publicKey ? wallet : {}
  const client = createClient(connection, walletContext as AnchorWallet)
  
  return (
    <ClientContext.Provider value={{client}}>
      {children}
    </ClientContext.Provider>
  )
}