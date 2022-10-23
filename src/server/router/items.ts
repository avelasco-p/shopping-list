import { createRouter } from "./context";
import { z } from "zod";

export const itemsRouter = createRouter()
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.item.findUnique({
        where: { id: input.id },
        select: { id: true, name: true, price: true },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.item.findMany();
    },
  })
  .query("getByList", {
    input: z.object({
      listId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.list.findUnique({
        where: { id: input.listId },
        include: { items: { select: { id: true, name: true } } },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      name: z.string().min(3, "item name must be at least 3 letters"),
      price: z.number().min(1),
      listId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.item.create({
        data: {
          name: input.name,
          price: input.price,
          list: { connect: { id: input.listId } },
        },
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
