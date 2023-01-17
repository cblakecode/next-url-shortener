import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import client from "./lib/prisma";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getSession({ req: opts.req });

  return {
    session,
    client,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
