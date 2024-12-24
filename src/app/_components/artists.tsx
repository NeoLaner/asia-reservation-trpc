"use client";

import { api } from "@/trpc/react";
import Link from "next/link";

export function Artists() {
  const artists = api.artist.getAll.useQuery();
  return (
    <div className="">
      {
        <div className="flex flex-wrap gap-2">
          {artists.data?.map((artist) => (
            <Link key={artist.id} href={`/artists/${artist.id}`}>
              <div className="bg-gray-800 p-4">
                <div>Artists name: {artist.name}</div>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  );
}
