import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup
    .string()
    .required("Enter password")
    .min(8, "Must be at least 8 characters")
    .max(50, "Maximum of 50 characters"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Enter valid email").required("Email is required"),
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Enter password")
    .min(8, "Must be at least 8 characters")
    .max(50, "Maximum of 50 characters"),
  newPassword: yup
    .string()
    .required("Enter password")
    .min(8, "Must be at least 8 characters")
    .max(50, "Maximum of 50 characters"),
  newPasswordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null] as Array<string | yup.Reference<unknown>>,
      "Passwords must match"
    )
    .required("Confirm Password is required"),
});
