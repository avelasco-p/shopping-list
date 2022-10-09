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
      name: z.string().min(3, "item name must be at least 3 letters"),
      listId: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.item.create({
        data: { name: input.name, listId: parseInt(input.listId) },
      });
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
