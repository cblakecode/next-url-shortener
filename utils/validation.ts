import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be between 6-12 characters")
    .max(12, "Must be between 6-12 characters")
    .required("Required"),
});

export const signupSchema = Yup.object({
  name: Yup.string()
    .max(40, "must be 40 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be between 6-12 characters")
    .max(12, "Must be between 6-12 characters")
    .required("Required"),
  confirm_password: Yup.string()
    .label("confirm password")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
