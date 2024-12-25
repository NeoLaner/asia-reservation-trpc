import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Artist, type Artists } from "@/@types/RedisArtistData";
import { Salon, Salons } from "@/@types/RedisSalonData";

// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const salonRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const redis = ctx.redis;
    //get all keys of model form redis
    const keys = await redis.keys("models.Salons:*");

    // Fetch JSON data for each key
    const salons = [];
    for (const key of keys) {
      const data = (await redis.call("JSON.GET", key)) as string;
      salons.push(JSON.parse(data));
    }

    return salons as Salons;
  }),

  getById: publicProcedure
    .input(z.object({ salonId: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const redis = ctx.redis;

      const data = (await redis.call(
        "JSON.GET",
        `models.Salons:${input.salonId}`,
      )) as string;
      return JSON.parse(data) as Salon;
    }),

  getLatest: publicProcedure.query(() => {
    return posts.at(-1) ?? null;
  }),
});
