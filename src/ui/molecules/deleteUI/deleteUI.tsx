import React from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "react-router-dom";
export function DeleteUI() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  console.log(name);
  return (
    <div>
      <Icon icon="material-symbols:error" />
      <p>Are you sure you want to delete {}</p>
      <p>
        <button>Yes Delete</button>
        <button>No, Cancel</button>
      </p>
    </div>
  );
}
