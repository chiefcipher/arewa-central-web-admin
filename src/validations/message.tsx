// category validations
import * as yup from "yup";

export const sendMessageSchema = yup.object({
  recipientEmail: yup
    .string()
    .email("Enter valid email")
    .required("Recipient email is required"),
  title: yup.string().required("Message title is required"),
  content: yup.string().required("Content is required"),
  priority: yup.string().required("Priority is required"),
});
