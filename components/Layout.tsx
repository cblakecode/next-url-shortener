import { ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-2 prose-headings:font-sans">
      <Head>
        <title>Next Url Shortener</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="url shortener" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>

      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
