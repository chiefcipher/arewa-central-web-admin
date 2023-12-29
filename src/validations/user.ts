import * as yup from "yup";

export const updateAdminSchema = yup.object({
  email: yup.string().email("Enter valid email").required("Email is required"),
  tel: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  role: yup.string().required("Role is required"),
  isVerifiedEmail: yup.boolean().required("Email status is required"),
});
