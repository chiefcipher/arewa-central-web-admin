import React, { useState } from "react";
import { SubSectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import { Icon } from "@iconify/react";
import styles from "./profileSecurityUpdate.module.scss";
import { Formik, Form } from "formik";
import { updatePasswordSchema } from "../../../validations/auth";

export function ProfileSecurityUpdate() {
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState<
    "updated" | "not-updated"
  >("not-updated");
  // updates password
  const handlePasswordUpdate = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(values);
      setPasswordUpdateStatus("updated");
      actions.setSubmitting(false);
    }, 3000);
  };
  return (
    <div className={styles.security}>
      <SubSectionHeader>Security</SubSectionHeader>
      <p className={styles.promptPara}>
        Use this form to change your password{" "}
      </p>
      <div className={styles.formArea}>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          validationSchema={updatePasswordSchema}
          onSubmit={handlePasswordUpdate}
        >
          {({ touched, values, errors, isSubmitting, handleChange }) => {
            return (
              <Form>
                <p>
                  <label htmlFor="currentPassword">Current Password *</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={values.currentPassword}
                    onChange={handleChange}
                  />
                  <span>
                    {touched.currentPassword && errors.currentPassword}{" "}
                  </span>
                </p>

                <p>
                  <label htmlFor="newPassword">New Password *</label>
                  <input
                    type={"password"}
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                  <span>{touched.newPassword && errors.newPassword} </span>
                </p>
                <p>
                  <label htmlFor="newPasswordConfirm">
                    New Password Confirm *
                  </label>
                  <input
                    type={"password"}
                    name="newPasswordConfirm"
                    value={values.newPasswordConfirm}
                    onChange={handleChange}
                  />
                  <span>
                    {touched.newPasswordConfirm && errors.newPasswordConfirm}{" "}
                  </span>
                </p>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  title={"Click to save changes"}
                  disabled={isSubmitting || passwordUpdateStatus === "updated"}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="fa:spinner" className={"spinner"} />
                      <span>Updating...</span>
                    </>
                  ) : passwordUpdateStatus === "updated" ? (
                    <>
                      <Icon icon="mdi:account-tick" />

                      <span>Updated </span>
                    </>
                  ) : (
                    <>
                      <Icon icon="lets-icons:save-fill" />

                      <span>Update </span>
                    </>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
