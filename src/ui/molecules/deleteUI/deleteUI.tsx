import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import { LoaderIcon } from "../../../shared/assets";
import styles from "./deleteUI.module.scss";
interface I_DeleteUIProps {
  handleDelete: () => Promise<boolean>;
  cancelUrl: string;
}
export function DeleteUI({ handleDelete, cancelUrl }: I_DeleteUIProps) {
  const [deleteStage, setDeleteStage] = useState<
    "deleting" | "deleted" | "not-started" | "error-occurred"
  >("not-started");
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const { deleteId } = useParams();
  console.log({ name, deleteId, cancelUrl });
  const navigate = useNavigate();
  if (!name || !deleteId) return <Navigate to={cancelUrl} />;
  return (
    <div className={styles.deleteUI}>
      <div className={styles.wrapper}>
        <Icon icon="material-symbols:error" />

        {deleteStage === "deleted" ? (
          <p className={styles.successDeletePrompt}>
            Delete operation successful. <Link to={cancelUrl}>Go Back</Link>
          </p>
        ) : deleteStage === "error-occurred" ? (
          <p className={styles.errorOccurredPrompt}>
            An error occurred, kindly check internet and try again!
          </p>
        ) : deleteStage === "not-started" || deleteStage === "deleting" ? (
          <p className={styles.deletePrompt}>
            Are you sure you want to delete <span>{name}</span>
          </p>
        ) : (
          ""
        )}
        {deleteStage !== "deleted" && (
          <p className={styles.deleteCtas}>
            <button
              onClick={async () => {
                setDeleteStage("deleting");
                try {
                  await handleDelete();
                  setDeleteStage("deleted");
                } catch (err) {
                  setDeleteStage("error-occurred");
                }
              }}
              disabled={deleteStage === "deleting"}
            >
              {deleteStage === "deleting" ? (
                <LoaderIcon />
              ) : (
                <span>
                  {deleteStage === "error-occurred" ? "Try Again" : "Delete"}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate(cancelUrl)}
              disabled={deleteStage === "deleting"}
            >
              Cancel
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
