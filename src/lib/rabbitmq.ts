import { env } from "@/env";
import amqp from "amqplib";

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;
console.log("rabbit connection", connection);

export async function getRabbitMQChannel() {
  try {
    if (!connection) {
      connection = await amqp.connect({
        port: 5673,
        hostname: "localhost",
        protocol: "amqp",
      });
      connection.on("error", (err) => {
        console.error("Connection error:", err);
        connection = null; // Reset connection on error
      });

      connection.on("close", () => {
        console.log("Connection closed");
        connection = null; // Reset connection on close
      });

      channel = await connection.createChannel();
      console.log("Channel created");
    }

    if (!channel) {
      channel = await connection.createChannel();
      console.log("Channel recreated");
    }

    return channel;
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    if (connection) {
      await connection.close(); // Ensure connection is closed on error
    }
    connection = null; // Reset to allow reconnection attempt
  }
}
