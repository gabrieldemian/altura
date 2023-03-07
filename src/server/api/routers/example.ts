import { Alchemy, type AlchemySettings, Network } from "alchemy-sdk";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getNFTs = createTRPCRouter({
  getNFTs: publicProcedure
    .input(
      z.object({
        addr: z.string().length(42, "Addresses should have 42 bytes"),
        pageSize: z.number().default(9),
        pageKey: z.string().optional()
      })
    )
    .mutation(async ({ input: { addr, pageSize, pageKey } }) => {
      const settings: AlchemySettings = {
        apiKey: 'xaF98lzshzpXD_1-QrwFcFnuxUbyRpsp',
        network: Network.ETH_MAINNET,
      }

      const alchemy = new Alchemy(settings)
      const data = await alchemy.nft.getNftsForOwner(addr, {
        pageSize,
        pageKey,
      })

      return {
        data
      };
    }),
});
