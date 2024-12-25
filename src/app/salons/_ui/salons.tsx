"use client";

import Block from "@/app/_components/block";
import { api } from "@/trpc/react";
import Link from "next/link";

function Salon() {
  const { data: salons } = api.salon.getAll.useQuery();

  return (
    <div className="flex gap-2">
      {salons?.map((salon) => (
        <Link key={salon.id} href={`/salons/${salon.id}`}>
          <Block>
            <div>{salon.name}</div>
            <div>{salon.city}</div>
          </Block>
        </Link>
      ))}
    </div>
  );
}

export default Salon;
