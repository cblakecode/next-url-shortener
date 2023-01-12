import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/prisma";

export default async function getUserWithUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  try {
    if (typeof email === "string") {
      const response = await client.user.findUnique({
        where: {
          email,
        },
        include: {
          urls: true,
        },
      });
      res.status(200).send(response);
    }
  } catch (error: any) {
    console.error(error);
  }
}
