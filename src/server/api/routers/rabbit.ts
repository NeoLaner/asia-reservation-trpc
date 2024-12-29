import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const exchange = "main";
const exchangeType = "direct";
const queue = "auth";
const routingKey = "auth_key";
let mmd;
export const rabbitRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    //make exchange
    await ctx.rabbitChannel?.assertExchange(exchange, exchangeType, {
      durable: true,
    });
    console.log("exchange asserted");
    //create queue
    await ctx.rabbitChannel?.assertQueue(queue);
    //bind our queues to an specific exchange
    await ctx.rabbitChannel?.bindQueue(queue, exchange, routingKey);

    /* 
    publish our messages
    const messageSended = ctx.rabbitChannel?.publish(
      // exchange name
      exchange,
      // queue name
      queueName,
      // message
      Buffer.from("Don'd dell me wad dodo"),
    );
    */

    ctx.rabbitChannel?.sendToQueue(
      queue,
      Buffer.from("Don'd dell me wad dodo"),
    );

    // const message = await ctx.rabbitChannel?.consume("auth-back", (message) => {
    //   console.log(message);
    // });

    console.log("message sended");
    return true;
  }),
});
