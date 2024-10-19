import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useQuery } from "@tanstack/react-query"
import * as anchor from "@coral-xyz/anchor"

export interface TokenHoldingReturnType {
  mint: string,
  balance: string,
  decimals: number
}

export function useGetTokensHolding() {
  const {connection} = useConnection()
  const {publicKey} = useWallet()

  return useQuery({
    queryKey: [
      'get-tokens-holding', 
      {
        publicKey
      }
    ],
    queryFn: async() => {
      if (!publicKey) {
        return null
      }
    
      try {
        const tokens = await connection.getParsedTokenAccountsByOwner(
          publicKey, 
          {programId: anchor.utils.token.TOKEN_PROGRAM_ID}
        )
        
        const parsedTokens = tokens.value.map(token => {
          const parsedData = token.account.data
          const holding: TokenHoldingReturnType = {
            mint: parsedData.parsed.info.mint,
            balance: parsedData.parsed.info.tokenAmount ? parsedData.parsed.info.tokenAmount.amount : "0",
            decimals: parsedData.parsed.info.tokenAmount ? parsedData.parsed.info.tokenAmount.decimals : 0,
          }
  
          return holding
        })
  
        console.log("fetched token holdings")
        return parsedTokens  
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}