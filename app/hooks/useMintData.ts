import { fetchMetadata, findMetadataPda } from "@metaplex-foundation/mpl-token-metadata"
import { useConnection } from "@solana/wallet-adapter-react"
import { useQuery } from "@tanstack/react-query"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {publicKey} from "@metaplex-foundation/umi"
import { PublicKey } from "@solana/web3.js"
import axios from "axios"
import { ellipsify } from "../utils"

export type MintInfoType = {
    address: PublicKey,
    name: string | null,
    decimals: number,
    image: string | null
}

type ParseTokenType = {
  parsed: {
    info: {
      decimals: number
    }
  }
}

export function useGetMintData(mint?: string) {
  const {connection} = useConnection()

  return useQuery({
    queryKey: ['get-mint-data', {mint}],
    queryFn: async(): Promise<MintInfoType | null> => {
      if (!mint) {
        return null
      }

      const umi = createUmi(connection.rpcEndpoint)
      const mintKey = new PublicKey(mint)

      try {
        const tokenInfo = await connection.getParsedAccountInfo(mintKey)
        
        const parsedData = tokenInfo.value?.data as ParseTokenType
        const decimals = parsedData.parsed.info.decimals
        console.log(`fetched mint data for ${ellipsify(mint)}`)

        try {
          const metadataKey = findMetadataPda(umi, {mint: publicKey(mint) })
          const metadata = await fetchMetadata(umi, metadataKey) 
          console.log(`fetched metadata for ${ellipsify(mint)}`)

          try {
            const uriInfo = await axios.get(metadata.uri)
            if (uriInfo.data.image) {
              const imageLink = uriInfo.data.image as string
              return {
                decimals,
                name: metadata.symbol,
                image: imageLink,
                address: mintKey
              }
            }

            return {
              decimals,
              name: metadata.symbol,
              image: null,
              address: mintKey

            }
          } catch {
            return {
              decimals,
              name: metadata.symbol,
              image: null,
              address: mintKey
            }
          }
        } catch {
          return {
            decimals,
            name: null,
            image: null,
            address: mintKey
          }
        }
      } catch(e) {
        console.log(e)
        return null
      }

    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}