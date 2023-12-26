import React, { useState } from "react";
import styles from "./forgotPasswordForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Pages } from "../../../shared/pages";
import { Formik, Form } from "formik";
import { AsyncButton } from "../../atoms/asyncButton/asyncButton";
import { forgotPasswordSchema } from "../../../validations/auth";

import { ForgotPasswordIcon } from "../../../shared/assets";

export function ForgotPasswordForm() {
  const [successPasswordResetRequest, setSuccessPasswordResetRequest] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log({ values });

      actions.setSubmitting(false);
      setSuccessPasswordResetRequest(true);

      // navigate(Pages.dashboard);
    }, 3000);
  };
  return (
    <div className={styles.forgotPassword}>
      <div className={styles.header}>
        <Link to={"/" + Pages.login}>
          <img src={ForgotPasswordIcon} alt="Forgot Password" />
          <span>Login Instead?</span>
        </Link>
        <p>
          <span>STEP 01/01</span>
          <span>Request Reset</span>
        </p>
      </div>

      {!successPasswordResetRequest ? (
        <div className={styles.formArea}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({
              touched,
              values,
              errors,
              isSubmitting,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <p>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="eg johndoe@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <span>{touched.email && errors.email} </span>
                  </p>

                  <AsyncButton
                    handleSubmit={handleSubmit}
                    isAsync={isSubmitting}
                    text="Request Reset"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <div className={styles.successRequest}>
          {" "}
          Check email for further instructions
        </div>
      )}
    </div>
  );
}
