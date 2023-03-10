import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.VERCEL_ENV !== "production") globalThis.prisma = client;

// export const connectDB = async () => {
//   try {
//     await client.$connect();
//     console.log("? Database connected successfully");
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   } finally {
//     await client.$disconnect();
//   }
// };

export default client;
