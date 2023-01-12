import { Url } from "@prisma/client";
import client from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export const redirectUrl = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { short } = req.query;
  if (typeof short === "string") {
    try {
      const getOriginal: Url | null = await client.url.findFirst({
        where: {
          short,
        },
      });
      res.redirect(getOriginal!.original);
    } catch (error) {
      res.status(400).json({ message: "could not find url" });
    }
  }
};
