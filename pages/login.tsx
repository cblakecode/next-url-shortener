import Link from "next/link";
import { useFormik } from "formik";
import { loginSchema } from "../utils/validation";
import { signIn } from "next-auth/react";
import { Prisma } from "@prisma/client";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <main className="w-3/4 min-h-max flex overflow-hidden">
        <div className="w-full md:w-1/2 bg-base-100 min-h-max flex flex-col p-4 gap-2 rounded-lg shadow">
          <form
            onSubmit={formik.handleSubmit}
            className="form-control w-full gap-4"
          >
            <h1 className="text-center md:hidden text-xl font-semibold">
              Login
            </h1>
            <div className="w-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="input input-md w-full bg-base-200 font-serif"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="label-text-alt text-error font-serif">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="w-full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                className="input input-md w-full bg-base-200 font-serif"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="label-text-alt text-error font-serif">
                  {formik.errors.password}
                </span>
              ) : null}
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              Login
            </button>
          </form>
          <div className="w-full flex flex-col items-center">
            <div className="divider">OR</div>
            <button
              className="btn gap-1 btn-block"
              type="button"
              onClick={() =>
                signIn("google", { callbackUrl: process.env.BASE_URL })
              }
            >
              Login With{" "}
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
            <p className="pt-2">
              No Account?{" "}
              <Link href="/signup" className="link link-hover link-secondary">
                sign up
              </Link>
            </p>
          </div>
        </div>
        <section className="p-2 bg-base-200 w-1/2 md:flex hidden flex-col items-center justify-center">
          <h1 className="text-5xl">Login</h1>
        </section>
      </main>
    </div>
  );
};

export default Login;
