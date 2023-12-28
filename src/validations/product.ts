// category validations
import * as yup from "yup";

export const createProductSchema = yup.object({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .min(0, "Cannot be less than 0")
    .required("Price is required"),
  discountedPrice: yup.number().min(0, "Cannot be less than 0"),

  shortDescription: yup
    .string()
    .required("Description is required")
    .min(8, "Must be at least 8 characters")
    .max(100, "Maximum of 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(8, "Must be at least 8 characters")
    .max(10000, "Maximum of 10000 characters"),

  quantityLeft: yup.number().required("Stock quantity is required"),
  brand: yup.string(),
  model: yup.string(),
});
