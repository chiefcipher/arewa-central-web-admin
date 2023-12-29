import React, { useEffect, useState } from "react";
import styles from "../messageAddNew/messageAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_FormMessage, I_Notification } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
  PrimaryTextAreaField,
} from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { sendMessageSchema } from "../../../validations/message";
import { useSearchParams } from "react-router-dom";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";

export function MessageEdit(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });

  const [sampleMessage, setSampleMessage] = useState<I_Notification | null>(
    null
  );

  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(JSON.stringify(values));
      setFormMessage({
        type: "success",
        content: values.title + " message updated successfully",
      });
      actions.setSubmitting(false);
      actions.resetForm();
    }, 3000);
  };
  useEffect(() => {
    setTimeout(() => {
      setSampleMessage({
        id: "random-id",
        // sender  :"Admin 1" ,
        recipientEmail: "johndoe@gmail.com",
        date: Date.now(),
        title: "Update KYC Information",
        content:
          "Update your kyc information to process refund for your declined order",
        priority: "high",
      });
    }, 3000);
  }, []);
  if (!sampleMessage) return <LoadingUI />;
  return (
    <div className={styles.addNew}>
      <SectionHeader>Edit Message</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            recipientEmail: sampleMessage.recipientEmail || "",
            title: sampleMessage.title || "",
            content: sampleMessage.content || "",
            priority: sampleMessage.priority || "",
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
