import type { NextPage } from "next";
import { useFormik } from "formik";
import { urlSchema } from "../utils/validation";

const Home: NextPage = () => {
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
    <main className="flex flex-col gap-4 p-2">
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
    </main>
  );
};

export default Home;
