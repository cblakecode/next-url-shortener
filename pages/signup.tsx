import { useFormik } from "formik";
import { signupSchema } from "../utils/validation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import client from "../lib/prisma";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="bg-base-200 min-h-screen flex justify-center items-center">
      <main className="w-3/4 min-h-max flex items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-lg shadow w-full md:w-1/2 form-control flex flex-col bg-base-100 overflow-hidden gap-4 p-4"
        >
          <legend className="text-center md:hidden text-xl font-semibold">
            Register
          </legend>
          <div className="w-full">
            <input
              type="text"
              className="input input-md w-full font-serif bg-base-200"
              name="name"
              placeholder="Full Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="label-text-alt text-error">
                {formik.errors.name}
              </span>
            ) : null}
          </div>
          <div>
            <input
              type="email"
              className="input input-md w-full font-serif bg-base-200"
              name="email"
              placeholder="Email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="label-text-alt text-error">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              className="input input-md w-full font-serif bg-base-200"
              name="password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="label-text-alt text-error">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              className="input input-md w-full font-serif bg-base-200"
              placeholder="Confirm Password"
              name="confirm_password"
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="label-text-alt text-error">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <button className="btn btn-block btn-primary" type="submit">
              Sign Up
            </button>
            <div className="divider">OR</div>
            <button className="btn btn-block gap-1">
              Register With{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
            <p className="text-center pt-4">
              Already Have an Account?{" "}
              <Link href="/login" className="link link-hover link-secondary">
                Login
              </Link>
            </p>
          </div>
        </form>
        <section className="w-1/2 justify-center items-center hidden md:flex">
          <h1 className="text-5xl">Register</h1>
        </section>
      </main>
    </div>
  );
};

export default Signup;
