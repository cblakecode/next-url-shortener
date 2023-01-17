import { useField } from "formik";
import Loading from "./Loading";

const UrlInput = ({ label, loader, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full form-control gap-2">
      <label htmlFor="url" className="label-text">
        {label}
      </label>
      <div className="input-group input-group-md w-full">
        <input
          {...field}
          {...props}
          className={
            !meta.error
              ? "input bg-base-200 w-full"
              : "input border-error w-full"
          }
        />
        <button className="btn btn-square" type="submit">
          {loader ? (
            <Loading />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <label className="label-text-alt text-error-content">
          {meta.error}
        </label>
      ) : null}
    </div>
  );
};

export default UrlInput;
