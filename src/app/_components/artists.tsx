"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import Block from "./block";

export function Artists() {
  const artists = api.artist.getAll.useQuery();
  return (
    <div className="">
      {
        <div className="flex flex-wrap gap-2">
          {artists.data?.map((artist) => (
            <Link key={artist.id} href={`/artists/${artist.id}`}>
              <Block>
                <div>Artists name: {artist.name}</div>
              </Block>
            </Link>
          ))}
        </div>
      }
    </div>
  );
}
