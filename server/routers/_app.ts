import * as y from "yup";
import { privateProcedure, router, publicProcedure } from "../trpc";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";
// connectDB();

export const appRouter = router({
  userWithUrls: publicProcedure.query(({ ctx }) => {
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
  shortenUrl: publicProcedure
    .input(
      y.object({
        url: y.string().url().required(),
        id: y.string().required(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const original = new URL(input.url);
        const short = `${original.protocol}//${original.hostname}/${nanoid(
          10
        )}`;
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
});

export type AppRouter = typeof appRouter;
