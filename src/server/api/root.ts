import { artistRouter } from "@/server/api/routers/artist";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { salonRouter } from "./routers/salon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  artist: artistRouter,
  salon: salonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
