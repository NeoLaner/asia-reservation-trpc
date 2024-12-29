import { api } from "@/trpc/server";

async function page({ params }: { params: Promise<{ artistsId: string }> }) {
  const { artistsId } = await params;

  const artist = await api.artist.getById({ artistsId });
  return (
    <div>
      <h1 className="mb-8 text-center text-6xl">{artist.name} 💅</h1>
      <div className="flex flex-col bg-gray-800 p-8">
        <div>Artist city: {artist.city}</div>
        <div>Artist age: {artist.age}</div>
        <div className="p-2">
          <div>Artist services </div>
          {artist.services.map((service) => (
            <div key={service.id} className="p-2">
              <div>Service name {service.name}</div>
              <div>Service price {service.price}$</div>
              <div>Service score {service.score}</div>
              {/* <div>{service.name}</div> */}
            </div>
          ))}
        </div>
        {/* <div>Artist name: {artist.name}</div> */}
      </div>
    </div>
  );
}

export default page;
