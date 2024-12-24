import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Artist, type Artists } from "@/@types/RedisSalonData";

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

export const artistRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const redis = ctx.redis;
    //get all keys of model form redis
    const keys = await redis.keys("models.Artists:*");

    // Fetch JSON data for each key
    const artists = [];
    for (const key of keys) {
      const data = (await redis.call("JSON.GET", key)) as string;
      artists.push(JSON.parse(data));
    }

    return artists as Artists;
  }),

  getById: publicProcedure
    .input(z.object({ artistsId: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const redis = ctx.redis;
      const data = (await redis.call(
        "JSON.GET",
        `models.Artists:${input.artistsId}`,
      )) as string;
      return JSON.parse(data) as Artist;
    }),

  getLatest: publicProcedure.query(() => {
    return posts.at(-1) ?? null;
  }),
});
