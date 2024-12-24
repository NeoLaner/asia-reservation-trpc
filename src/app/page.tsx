import { api, HydrateClient } from "@/trpc/server";
import { Artists } from "./_components/artists";

export default async function Home() {
  const artists = await api.artist.getAll();

  // console.log(hello);

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div>hi</div>
    </HydrateClient>
  );
}
