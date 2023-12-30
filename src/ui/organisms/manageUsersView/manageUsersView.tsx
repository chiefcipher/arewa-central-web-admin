import React, { useEffect, useState } from "react";
import styles from "./manageUsersView.module.scss";
import { Form, Formik } from "formik";
import { I_User } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
} from "../../atoms/fields/fields";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { updateAdminSchema } from "../../../validations/user";
import { E_Roles } from "../../../typescript/enums";

export function ManageUsersView(): JSX.Element {
  const [sampleUser, setSampleUser] = useState<I_User | null>(null);
  useEffect(() => {
    if (!sampleUser) {
      setTimeout(() => {
        // simulate getting products
        setSampleUser({
          id: "random-id",
          email: "user@gmail.com",
          tel: "2349075859285",
          gender: "male",
          role: E_Roles.user,
          isVerifiedEmail: false,
        });
      }, 1000);
    }
  }, [sampleUser]);
  const handleSubmit = (values: any, actions: any) => {
    console.log("submitted");
  };

  if (!sampleUser) return <LoadingUI />;
  return (
    <div className={styles.view}>
      <SectionHeader>{`View User (${sampleUser.email})`}</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            email: sampleUser.email || "",
            tel: sampleUser.tel || "",
            gender: sampleUser.gender || "male",
            role: sampleUser.role || "",
            isVerifiedEmail: sampleUser.isVerifiedEmail || false,
          }}
          validationSchema={updateAdminSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              <PrimaryInputField
                type={"text"}
                placeholder="example@gmail.com"
                name="email"
                value={values.email}
                readOnly
                handleChange={handleChange}
                error={touched.email && errors.email}
                label={`User Email *`}
              />
              <PrimaryInputField
                type={"tel"}
                placeholder="234 123456789"
                name="tel"
                readOnly
                value={values.tel}
                handleChange={handleChange}
                error={touched.tel && errors.tel}
                label={`User Telephone *`}
              />
              <PrimarySelectField
                name="gender"
                value={values.gender}
                readOnly
                error={touched.gender && errors.gender}
                label={"Gender *"}
                handleChange={handleChange}
                options={[
                  { content: "Male", id: "male" },
                  { content: "Female", id: "female" },
                ]}
              />
              <PrimarySelectField
                name="role"
                value={values.role}
                error={touched.role && errors.role}
                label={"Role *"}
                readOnly
                handleChange={handleChange}
                options={[{ content: "User", id: E_Roles.user }]}
              />
              <PrimarySelectField
                name="isVerifiedEmail"
                readOnly
                options={[
                  { content: "Verified", id: "verified" },
                  { content: "Not Verified", id: "not-verified" },
                ]}
                value={values.isVerifiedEmail ? "verified" : "not-verified"}
                handleChange={handleChange}
                error={touched.isVerifiedEmail && errors.isVerifiedEmail}
                label={`Email Verification Status *`}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
