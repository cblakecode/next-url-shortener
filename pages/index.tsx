import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const Home: NextPage = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 prose-headings:font-sans relative">
      <Head>
        <title>Next Url Shortener</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex flex-col gap-4 ">
        <nav className="absolute top-0 inset-x-0 flex justify-end items-center p-4">
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text text-md font-semibold font-serif">
                Toggle Dark Mode
              </span>
              <input
                type="checkbox"
                className="toggle toggle-lg"
                data-toggle-theme="business,cmyk"
                data-act-class="ACTIVECLASS"
              />
            </label>
          </div>
        </nav>
        <h1 className="font-bold text-7xl">Url Shortener</h1>
        <form className="form-control gap-4 group hover:cursor-pointer">
          <label
            htmlFor="client_url"
            className="font-serif group-hover:cursor-pointer label label-text"
          >
            Enter Your Url Here
          </label>
          <input
            type="url"
            id="client_url"
            className="input input-bordered font-serif text-lg group-hover:cursor-pointer"
          />
          <button className="btn btn-primary btn-block font-serif">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
