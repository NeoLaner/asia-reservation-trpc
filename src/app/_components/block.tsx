import { type ReactNode } from "react";

function Block({ children }: { children: ReactNode }) {
  return <div className="w-40 bg-gray-800 p-4">{children}</div>;
}

export default Block;
