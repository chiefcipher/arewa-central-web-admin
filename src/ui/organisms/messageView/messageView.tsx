import React, { useEffect, useState } from "react";
import styles from "../messageAddNew/messageAddNew.module.scss";
import { Form, Formik } from "formik";
import { I_Notification } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
  PrimaryTextAreaField,
} from "../../atoms/fields/fields";

import { LoadingUI } from "../../atoms/loadingUI/loadingUI";

export function MessageView(): JSX.Element {
  const [sampleMessage, setSampleMessage] = useState<I_Notification | null>(
    null
  );

  const handleSubmit = (values: any, actions: any) => {
    console.log("submitted");
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
      <SectionHeader>View Message</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            recipientEmail: sampleMessage.recipientEmail || "",
            title: sampleMessage.title || "",
            content: sampleMessage.content || "",
            priority: sampleMessage.priority || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <PrimaryInputField
                readOnly
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
                readOnly
                placeholder="Update KYC information"
                name="title"
                value={values.title}
                handleChange={handleChange}
                error={touched.title && errors.title}
                label={"Title *"}
              />

              <PrimarySelectField
                name="priority"
                readOnly
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
                readOnly
                value={values.content}
                handleChange={handleChange}
                error={touched.content && errors.content}
                placeholder="Enter notification content"
                label="Content *"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
