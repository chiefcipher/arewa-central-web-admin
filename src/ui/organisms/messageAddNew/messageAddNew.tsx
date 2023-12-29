import React, { useState } from "react";
import styles from "./messageAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_FormMessage } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
  PrimaryTextAreaField,
} from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { sendMessageSchema } from "../../../validations/message";
import { useSearchParams } from "react-router-dom";

export function MessageAddNew(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });

  const [searchParams] = useSearchParams();
  const recipientEmail = searchParams.get("recipientEmail");

  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(JSON.stringify(values));
      setFormMessage({
        type: "success",
        content: values.title + " message sent successfully",
      });
      actions.setSubmitting(false);
      actions.resetForm();
    }, 3000);
  };

  return (
    <div className={styles.addNew}>
      <SectionHeader>Send Notification</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            recipientEmail: recipientEmail || "",
            title: "",
            content: "",
            priority: "",
          }}
          validationSchema={sendMessageSchema}
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
                type={"email"}
                placeholder="johndoe@gmail.com"
                name="recipientEmail"
                value={values.recipientEmail}
                handleChange={handleChange}
                error={touched.recipientEmail && errors.recipientEmail}
                label={"Recipient Email *"}
              />
              <PrimaryInputField
                type={"text"}
                placeholder="Update KYC information"
                name="title"
                value={values.title}
                handleChange={handleChange}
                error={touched.title && errors.title}
                label={"Title *"}
              />

              <PrimarySelectField
                name="priority"
                value={values.priority}
                error={touched.priority && errors.priority}
                label={"Priority *"}
                handleChange={handleChange}
                options={[
                  { content: "High", id: "high" },
                  { content: "Medium", id: "medium" },
                  { content: "Low", id: "low" },
                ]}
              />

              <PrimaryTextAreaField
                name="content"
                type="text"
                value={values.content}
                handleChange={handleChange}
                error={touched.content && errors.content}
                placeholder="Enter notification content"
                label="Content *"
              />
              <div style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                <FormMessage {...formMessage} />
              </div>

              <SubmitBtn
                isAsync={isSubmitting}
                text={"Submit"}
                handleSubmit={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
