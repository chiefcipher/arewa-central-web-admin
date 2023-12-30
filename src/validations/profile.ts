import * as yup from "yup";

export const updateBankInfoSchema = yup.object().shape({
  bankCode: yup.string().required("Select Bank"),
  accountNumber: yup
    .string()
    .required("Enter account number")
    .min(10, "Must be at least 10 characters"),
});

export const profileUpdateSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Maximum of 50 characters"),
  lastName: yup.string(),
  phoneNumber: yup.string().required("Phone number is required"),
  residentState: yup.string().required("State is required"),
  address: yup
    .string()
    .required("Address is required")
    .min(3, "Must be at least 3 characters"),
});
