import { api } from "@/trpc/server";

async function page() {
  const messageSended = await api.rabbit.getLatest();
  return <div>{messageSended ? "message sended" : "message not sended"}</div>;
}

export default page;
