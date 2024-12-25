import { api } from "@/trpc/server";

async function page({ params }: { params: Promise<{ salonId: string }> }) {
  const { salonId } = await params;
  console.log("salonId", salonId);

  const data = await api.salon.getById({ salonId });

  return <div className="">{data?.id}</div>;
}

export default page;
