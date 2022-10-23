import { createRouter } from "./context";
import { z } from "zod";

export const listsRouter = createRouter()
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.list.findUniqueOrThrow({
        where: { id: parseInt(input.id) },
        select: {
          id: true,
          name: true,
          items: { select: { id: true, name: true, price: true } },
        },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.list.findMany({
        // orderBy: [{ active: "desc" }],
        include: { _count: { select: { items: true } } },
      });
    },
  })
  .query("getActive", {
    async resolve({ ctx }) {
      return await ctx.prisma.list.findMany();
    },
  })
  .mutation("add", {
    input: z.object({
      name: z.string().min(3, "list name must be at least 3 letters"),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.list.create({ data: { name: input.name } });
    },
  })
  .mutation("activate", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.list.update({
        where: { id: input.id },
        data: { active: true },
      });
    },
  })
  .mutation("archive", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.list.update({
        where: { id: input.id },
        data: { active: false },
      });
    },
  });
