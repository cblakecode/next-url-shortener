import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/prisma";

export const createNewUrl = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { data } = req.query;
  const { id, original } = JSON.parse(data as string);

  const longUrl = new URL(original);
  const short = `${longUrl.protocol}//${longUrl.hostname}`;

  const url = await client.url.create({
    data: {
      original: "",
      userId: id as string,
      short,
    },
  });

  if (!url) {
    res.status(400).json({ message: "could not create url" });
  }

  const newUrl = short + Math.random().toString(16).slice(2);
  res.status(200).send(newUrl);
};
