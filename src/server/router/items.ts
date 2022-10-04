import { createRouter } from "./context";
import { z } from "zod";

export const itemsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.item.findMany();
    },
  })
  .mutation("add", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.item.create({ data: { name: input.name } });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.item.delete({ where: { id: input.id } });
    },
  });
