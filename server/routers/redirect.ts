import { router, publicProcedure } from "../trpc";
import * as y from "yup";

const redirectRouter = router({
  redirect: publicProcedure
    .input(
      y.object({
        url: y.string().url().required(),
      })
    )
    .query(async ({ ctx, input }) => {
      const url = await ctx.client.url.findFirst({
        where: { short: input.url },
      });
      await ctx.client.url.update({
        where: { id: url?.id },
        data: { clicks: { increment: 1 } },
      });
      console.log("reached redirect here");
      if (url!) console.log("could not find url");

      ctx.res.redirect(307, url?.original!);
    }),
});

export default redirectRouter;
