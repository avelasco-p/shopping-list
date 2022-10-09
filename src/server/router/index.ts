// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { itemsRouter } from "./items";
import { protectedExampleRouter } from "./protected-example-router";
import { listsRouter } from "./lists";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("lists.", listsRouter)
  .merge("items.", itemsRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
