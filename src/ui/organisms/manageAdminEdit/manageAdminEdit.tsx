import React, { useEffect, useState } from "react";
import styles from "./manageAdminEdit.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_FormMessage, I_User } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
} from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { editOrderSchema } from "../../../validations/order";
import { updateAdminSchema } from "../../../validations/user";
import { E_Roles } from "../../../typescript/enums";

export function ManageAdminEdit(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });

  const [sampleAdmin, setSampleAdmin] = useState<I_User | null>(null);
  useEffect(() => {
    if (!sampleAdmin) {
      setTimeout(() => {
        // simulate getting products
        setSampleAdmin({
          id: "random-id",
          email: "admin1@gmail.com",
          tel: "2349075859285",
          gender: "male",
          role: E_Roles.potential_admin,
          isVerifiedEmail: false,
        });
      }, 1000);
    }
  }, [sampleAdmin]);
  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(JSON.stringify(values));
      setFormMessage({
        type: "success",
        content: `${sampleAdmin?.email} updated successfully`,
      });
      actions.setSubmitting(false);
      actions.resetForm();
    }, 3000);
  };

  if (!sampleAdmin) return <LoadingUI />;
  return (
    <div className={styles.edit}>
      <SectionHeader>{`Edit Admin (${sampleAdmin.email})`}</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            email: sampleAdmin.email || "",
            tel: sampleAdmin.tel || "",
            gender: sampleAdmin.gender || "male",
            role: sampleAdmin.role || "",
            isVerifiedEmail: sampleAdmin.isVerifiedEmail || false,
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
                handleChange={handleChange}
                error={touched.email && errors.email}
                label={`Admin Email *`}
              />
              <PrimaryInputField
                type={"tel"}
                placeholder="234 123456789"
                name="tel"
                value={values.tel}
                handleChange={handleChange}
                error={touched.tel && errors.tel}
                label={`Admin Telephone *`}
              />
              <PrimarySelectField
                name="gender"
                value={values.gender}
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
                label={"Admin Role *"}
                handleChange={handleChange}
                options={[
                  { content: "Admin", id: E_Roles.admin },
                  { content: "Potential Admin", id: E_Roles.potential_admin },
                ]}
              />

              <div style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                <FormMessage {...formMessage} />
              </div>

              <SubmitBtn
                isAsync={isSubmitting}
                text={"Update"}
                handleSubmit={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
