import { router, publicProcedure } from "../trpc";
import { nanoid } from "nanoid";
import * as y from "yup";
import { TRPCError } from "@trpc/server";

const crudRouter = router({
  readWithUrls: publicProcedure.query(({ ctx }) => {
    try {
      const user = ctx.client.user.findUnique({
        where: {
          email: ctx.session?.user?.email!,
        },
        include: {
          urls: true,
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "could not find user",
        cause: error,
      });
    }
  }),
  create: publicProcedure
    .input(
      y.object({
        url: y.string().url().required(),
        id: y.string().required(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(__filename);

        const original = new URL(input.url);
        const short = `${original.protocol}//${original.hostname}/${nanoid(
          10
        )}`;
        console.log("here");

        return await ctx.client.url.create({
          data: {
            original: input.url,
            short,
            user: {
              connect: {
                id: input.id,
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "could not create user",
          cause: error,
        });
      }
    }),
  delete: publicProcedure
    .input(
      y.object({
        urlId: y.string().required(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.client.url.delete({
          where: { id: input.urlId },
        });
      } catch (error) {
        console.error(error);
      }
    }),
  deleteAll: publicProcedure
    .input(y.object({ userId: y.string().required() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.client.url.deleteMany({
          where: { userId: { contains: input.userId } },
        });
      } catch (error) {}
    }),
});

export default crudRouter;
