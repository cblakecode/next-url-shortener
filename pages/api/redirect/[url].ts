import { NextApiHandler } from "next";
import * as y from "yup";
import { urlSchema } from "../../../utils/validation";
import client from "../../../server/lib/prisma";

const schema = y.object({
  url: y.string().url().required(),
});

const redirect: NextApiHandler = async (req, res) => {
  const { url } = req.query;

  try {
    if (!url) throw new Error();

    await urlSchema.validate(url);
    const response = await client.url.findFirst({
      where: {
        short: url as string,
      },
    });
    res.redirect(307, response?.original!);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "bad request" });
  }
};
export default redirect;
