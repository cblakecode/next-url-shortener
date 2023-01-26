import crudRouter from "./crud";
import redirectRouter from "./redirect";
import { router } from "../trpc";

export const appRouter = router({
  crud: crudRouter,
  redirect: redirectRouter,
});

export type AppRouter = typeof appRouter;
