import React from "react";
import { I_FormMessage } from "../../../typescript/interfaces";
export const FormMessage = ({ type, content }: I_FormMessage) => (
  <p
    className={
      type === "error"
        ? "errorFormMessage"
        : type === "success"
        ? "successFormMessage"
        : "promptFormMessage"
    }
  >
    {content}
  </p>
);
