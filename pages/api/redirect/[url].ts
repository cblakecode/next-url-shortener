import { NextApiHandler } from "next";
import client from "../../../server/lib/prisma";

const redirect: NextApiHandler = async (req, res) => {
  const { url } = req.query;

  try {
    if (!url) throw new Error();

    const response = await client.url.update({
      where: {
        short: url as string,
      },
      data: { clicks: { increment: 1 } },
    });

    res.redirect(307, response?.original!);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "bad request" });
  }
};
export default redirect;
