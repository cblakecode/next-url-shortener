import crudRouter from "./crud";
import { router } from "../trpc";

export const appRouter = router({
  crud: crudRouter,
});

export type AppRouter = typeof appRouter;
