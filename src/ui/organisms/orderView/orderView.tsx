import React, { useEffect, useState } from "react";
import styles from "./orderView.module.scss";
import { Form, Formik } from "formik";
import { I_Order } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
} from "../../atoms/fields/fields";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { E_Order_Remark, E_Order_Status } from "../../../typescript/enums";
import { SAMPLE_PRODUCT } from "../../../shared/sampleProduct";
import { editOrderSchema } from "../../../validations/order";
import { formatCurrency, formatDate } from "../../../typescript/utils";

export function OrderView(): JSX.Element {
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
          orderItems: [
            SAMPLE_PRODUCT,
            SAMPLE_PRODUCT,
            SAMPLE_PRODUCT,
            SAMPLE_PRODUCT,
          ],
        });
      }, 1000);
    }
  }, [sampleOrder]);
  const handleSubmit = (values: any, actions: any) => {
    console.log("submitted");
  };

  if (!sampleOrder) return <LoadingUI />;
  return (
    <div className={styles.view}>
      <SectionHeader>{`View Order (${sampleOrder.orderId})`}</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            amount: sampleOrder.amount || "",
            quantity: sampleOrder.quantity || "",

            date: sampleOrder.date || "",
            status: sampleOrder.status || "",
            remark: sampleOrder.remark || "",
            userEmail: sampleOrder.userEmail || "",
          }}
          validationSchema={editOrderSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <PrimaryInputField
                type={"text"}
                readOnly
                placeholder=""
                name="userEmail"
                value={values.userEmail}
                handleChange={handleChange}
                error={touched.userEmail && errors.userEmail}
                label={"User Email *"}
              />
              <PrimaryInputField
                type={"text"}
                readOnly
                placeholder=""
                name="date"
                value={formatDate(Number(values.date))}
                handleChange={handleChange}
                error={touched.date && errors.date}
                label={"Date"}
              />
              <PrimarySelectField
                name="status"
                readOnly
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
                readOnly
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
              <PrimaryInputField
                type={"text"}
                readOnly
                placeholder=""
                name="quantity"
                value={values.quantity}
                handleChange={handleChange}
                error={touched.quantity && errors.quantity}
                label={"Quantity"}
              />
              <PrimaryInputField
                type={"text"}
                readOnly
                placeholder=""
                name="amount"
                value={values.amount}
                handleChange={handleChange}
                error={touched.amount && errors.amount}
                label={"Total Cost"}
              />
            </Form>
          )}
        </Formik>

        <div className={styles.orderItems}>
          {/* order items container  */}
          <h4>
            Order Items (
            {sampleOrder &&
              sampleOrder.orderItems &&
              sampleOrder.orderItems.length}
            )
          </h4>
          <div className={styles.orderItems__container}>
            {(sampleOrder.orderItems || []).map((item, i) => (
              <div className={styles.orderItem} key={item.name + i}>
                <h5>Item {i + 1}</h5>
                <div>
                  <span>Name</span>
                  <span>{item.name}</span>
                </div>
                <div>
                  <span>Category</span>
                  <span>{item.category}</span>
                </div>
                <div>
                  <span>Price</span>
                  <span>{formatCurrency(item.price)}</span>
                </div>{" "}
                <div>
                  <span>Discounted Price</span>
                  <span>{formatCurrency(item.discountedPrice || 0)}</span>
                </div>
                <div>
                  <span>Quantity Ordered </span>
                  <span>{item.quantityInCart}</span>
                </div>
                <div>
                  <span>Quantity Left </span>
                  <span>{item.quantityLeft}</span>
                </div>
                <div>
                  <span>Sizes </span>
                  <p className={styles.sizesWrapper}>
                    {item.sizes?.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </p>
                </div>
                <div>
                  <span>Selected Size </span>
                  <span>{item.selectedSize}</span>
                </div>
                <div>
                  <span>Colors </span>
                  <p className={styles.colorsWrapper}>
                    {item.colors?.map((c, i) => (
                      <span key={i} style={{ background: c }}></span>
                    ))}
                  </p>
                </div>
                <div>
                  <span>Selected Color </span>
                  <span>{item.selectedColor}</span>
                  <p className={styles.colorsWrapper}>
                    <span style={{ background: item.selectedColor }}></span>
                  </p>
                </div>
                <div>
                  <span>Brand </span>
                  <span>{item.brand}</span>
                </div>
                <div>
                  <span>Model </span>
                  <span>{item.model}</span>
                </div>
                <div>
                  <span>Description</span>
                  <span>{item.shortDescription}</span>
                </div>
                <div>
                  <span>Long Description</span>
                  <p
                    className={styles.longDescriptionWrapper}
                    dangerouslySetInnerHTML={{
                      __html: item.description.replaceAll("\n", "<br />"),
                    }}
                  />
                </div>
                <div>
                  <span>Images</span>
                  <p className={styles.imagesWrapper}>
                    {item.images.map((img, i) => (
                      <img src={img} key={i} alt={item.name} />
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
