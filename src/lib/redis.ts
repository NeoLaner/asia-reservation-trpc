import { env } from "@/env";
import Redis from "ioredis";

let redis: Redis | null = null;

export function createRedis() {
  if (!redis) {
    redis = new Redis({
      port: env.REDIS_PORT,
      retryStrategy() {
        // Reconnect after 5 seconds
        return 3000;
      },
    });
    redis.on("error", (error) => {
      console.error("Redis error", error);
    });
    return redis;
  } else return redis;
}
