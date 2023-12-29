import * as yup from "yup";

export const editOrderSchema = yup.object({
  status: yup.string().required("Status is required"),
  remark: yup.string().required("Remark is required"),
});
