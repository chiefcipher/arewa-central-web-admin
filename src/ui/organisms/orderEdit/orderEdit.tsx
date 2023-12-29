import React, { useEffect, useState } from "react";
import styles from "./orderEdit.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import {
  I_FormMessage,
  I_Notification,
  I_Order,
} from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
  PrimaryTextAreaField,
} from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { sendMessageSchema } from "../../../validations/message";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { E_Order_Remark, E_Order_Status } from "../../../typescript/enums";
import { SAMPLE_PRODUCT } from "../../../shared/sampleProduct";
import { editOrderSchema } from "../../../validations/order";

export function OrderEdit(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });

  const [sampleOrder, setSampleOrder] = useState<I_Order | null>(null);
  useEffect(() => {
    if (!sampleOrder) {
      setTimeout(() => {
        // simulate getting products
        setSampleOrder({
          date: Date.now(),
          orderId: "2023-12-29+ABCD-DDDHDHDHD",
          status: E_Order_Status.declined,
          amount: 40000,
          id: "random-id",
          quantity: 10,
          userEmail: "user1@gmail.com",
          remark: E_Order_Remark.paid,
          orderItems: [SAMPLE_PRODUCT, SAMPLE_PRODUCT],
        });
      }, 1000);
    }
  }, [sampleOrder]);
  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(JSON.stringify(values));
      setFormMessage({
        type: "success",
        content: `${sampleOrder?.orderId} updated successfully`,
      });
      actions.setSubmitting(false);
      actions.resetForm();
    }, 3000);
  };

  if (!sampleOrder) return <LoadingUI />;
  return (
    <div className={styles.edit}>
      <SectionHeader>{`Edit Order (${sampleOrder.orderId})`}</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            status: sampleOrder.status || "",
            remark: sampleOrder.remark || "",
          }}
          validationSchema={editOrderSchema}
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
              <PrimarySelectField
                name="status"
                value={values.status}
                error={touched.status && errors.status}
                label={"Order Status *"}
                handleChange={handleChange}
                options={[
                  { content: "Delivered", id: E_Order_Status.delivered },
                  { content: "Declined", id: E_Order_Status.declined },
                  {
                    content: "In State",
                    id: E_Order_Status.in_state_of_residence,
                  },
                  { content: "On Transit", id: E_Order_Status.on_transit },
                  { content: "Processing", id: E_Order_Status.processing },
                ]}
              />

              <PrimarySelectField
                name="remark"
                value={values.remark}
                error={touched.remark && errors.remark}
                label={"Order remark *"}
                handleChange={handleChange}
                options={[
                  { content: "Paid", id: E_Order_Remark.paid },
                  {
                    content: "Processing Refund",
                    id: E_Order_Remark.processing_refund,
                  },
                  { content: "Refunded", id: E_Order_Remark.refunded },
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
