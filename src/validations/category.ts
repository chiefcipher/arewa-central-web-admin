// category validations
import * as yup from "yup";

export const createCategorySchema = yup.object({
  name: yup.string().required("Category name is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(8, "Must be at least 8 characters")
    .max(50, "Maximum of 50 characters"),
});
