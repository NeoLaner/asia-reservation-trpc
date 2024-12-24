import { env } from "@/env";
import amqp from "amqplib";

let connection: amqp.Connection | null;
let channel: amqp.Channel;

export async function getRabbitMQChannel() {
  if (!connection) {
    connection = await amqp.connect(env.RABBITMQ_URL);
    channel = await connection.createChannel();
  }
  return channel;
}
