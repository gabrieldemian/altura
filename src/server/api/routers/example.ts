import { TRPCError } from '@trpc/server'
import { Alchemy, type AlchemySettings, Network } from 'alchemy-sdk'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const getNFTs = createTRPCRouter({
  getNFTs: publicProcedure
    .input(
      z.object({
        addr: z.string().length(42, 'Addresses should have 42 bytes'),
        pageSize: z.number().default(9),
        pageKey: z.string().optional(),
      }),
    )
    .mutation(async ({ input: { addr, pageSize, pageKey } }) => {
      const settings: AlchemySettings = {
        apiKey: 'xaF98lzshzpXD_1-QrwFcFnuxUbyRpsp',
        network: Network.ETH_MAINNET,
      }

      const alchemy = new Alchemy(settings)

      /**
       *   If the error happened here, it is probably because the wallet is invalid.
       *   Because all the validations were already handled before.
       */
      try {
        const data = await alchemy.nft.getNftsForOwner(addr, {
          pageSize,
          pageKey,
        })
        return {
          data,
        }
      } catch (cause) {
        /*
         *   We can't know the error format that comes from Alchemy API.
         *   So this is transforming it into a TRPCError.
         */
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Error while trying to get NFTs. Are you sure you passed a valid wallet address?',
          cause,
        })
      }
    }),
})
