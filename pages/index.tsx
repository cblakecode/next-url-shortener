import type { NextPage } from "next";
import { useFormik } from "formik";
import { urlSchema } from "../utils/validation";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { User } from "@prisma/client";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(status);

  useEffect(() => {
    setLoading(true);
    if (status === "authenticated") {
      fetch(`/api/user/${data?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
    }
    return setLoading(false);
  }, [status]);

  console.log(user);

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: urlSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <main className="grid grid-flow-dense">
      <div className="flex flex-col gap-4 p-2">
        <h1 className="font-bold text-7xl text-center">Url Shortener</h1>
        <form
          className="form-control gap-4 group hover:cursor-pointer"
          onSubmit={formik.handleSubmit}
        >
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button className="btn btn-primary btn-block font-serif">
            Shorten
          </button>
        </form>
      </div>
      <div>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Original</th>
              <th>Shortened</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </main>
  );
};

export default Home;
