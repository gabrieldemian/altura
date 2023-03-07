import { TRPCError } from "@trpc/server";
import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getNFTs = createTRPCRouter({
  getNFTs: publicProcedure
    .input(
      z.object({
        addr: z.string().length(42, "Addresses should have 42 bytes"),
        pageSize: z.number().default(10),
        pageKey: z.string().default('0')
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
        pageKey
      })

      return {
        data
      };
    }),
});
