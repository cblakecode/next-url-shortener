import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/prisma";
import { nanoid } from "nanoid";

export const createNewUrl = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, url } = req.query;

  const longUrl = new URL(url as string);
  const short = `${longUrl.protocol}//${longUrl.hostname}/${nanoid(10)}`;

  const newUrl = await client.url.create({
    data: {
      original: "",
      userId: id as string,
      short,
    },
  });

  if (!newUrl) {
    res.status(400).json({ message: "could not create url" });
  }

  res.status(200).json({ message: `Successfully Shortened` });
};
