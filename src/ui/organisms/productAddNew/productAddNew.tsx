import React, { useEffect, useState } from "react";
import styles from "./productAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_FormMessage } from "../../../typescript/interfaces";
import { createCategorySchema } from "../../../validations/category";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimaryInputField,
  PrimarySelectField,
  PrimaryTextAreaField,
  PrimaryVariableSelectorField,
} from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { formatCurrency } from "../../../typescript/utils";

const sampleCategory = {
  id: "random-id",
  name: "Bag",
  createdAt: Date.now(),
  description: "A nice category",
  productSize: 40,
};
export function ProductAddNew(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });
  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(values);
      actions.setSubmitting(false);
      setFormMessage({
        type: "success",
        content: values.name + " category created successfully",
      });
      actions.resetForm();
    }, 3000);
  };

  useEffect(() => {
    setSize((x) => (x ? "" : x));
  }, [sizes]);
  useEffect(() => {
    setColor((x) => (x ? "" : x));
  }, [colors]);
  return (
    <div className={styles.addNew}>
      <SectionHeader>Create Product</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            name: "",
            category: "",
            price: "",
            discountedPrice: "",
            shortDescription: "",
            description: "",
            quantityLeft: "",
            brand: "",
            model: "",
            sizes: [],
            colors: [],
          }}
          validationSchema={createCategorySchema}
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
                placeholder="eg Bag"
                value={values.name}
                handleChange={handleChange}
                error={touched.name && errors.name}
                name="name"
                label={"Product Name *"}
              />
              <PrimarySelectField
                name="category"
                value={values.category}
                error={touched.category && errors.category}
                label={"Category *"}
                handleChange={handleChange}
                // todo options comes from api
                options={Array(10)
                  .fill(sampleCategory)
                  .map((x) => ({ content: x.name, id: x.id }))}
              />

              <PrimaryInputField
                type={"number"}
                placeholder="0"
                name="price"
                value={values.price}
                handleChange={handleChange}
                error={touched.price && errors.price}
                label={`Product Price * (${formatCurrency(
                  Number(values.price)
                )})`}
              />
              <PrimaryInputField
                type={"text"}
                placeholder=""
                name="discountedPrice"
                value={values.discountedPrice}
                handleChange={handleChange}
                error={touched.discountedPrice && errors.discountedPrice}
                label={`Discounted Price  (${formatCurrency(
                  Number(values.discountedPrice)
                )})`}
              />
              <PrimaryInputField
                type={"text"}
                placeholder=""
                name="brand"
                value={values.brand}
                handleChange={handleChange}
                error={touched.brand && errors.brand}
                label={"Brand"}
              />

              <PrimaryInputField
                type={"text"}
                placeholder=""
                name="model"
                value={values.model}
                handleChange={handleChange}
                error={touched.model && errors.model}
                label={"Model"}
              />

              <PrimaryInputField
                type={"number"}
                placeholder="0"
                name="quantityLeft"
                value={values.quantityLeft}
                handleChange={handleChange}
                error={touched.quantityLeft && errors.quantityLeft}
                label={"Stock quantity *"}
              />

              <PrimaryVariableSelectorField
                name="color"
                inputValue={color}
                handleChange={(e) => setColor(e.target.value)}
                error={false}
                type="text"
                placeholder="#202020"
                label="Colors"
                addedValues={colors}
                addValue={() =>
                  !colors.includes(color) && color
                    ? setColors((x) => [...x, color])
                    : null
                }
                removeValue={(value) =>
                  setColors((x) =>
                    x.filter(
                      (a) =>
                        a.trim().toLowerCase() !==
                        value.trim().toLocaleLowerCase()
                    )
                  )
                }
              />
              <PrimaryVariableSelectorField
                name="size"
                inputValue={size}
                handleChange={(e) => setSize(e.target.value)}
                error={false}
                type="text"
                placeholder="#202020"
                label="Sizes"
                addedValues={sizes}
                addValue={() =>
                  !sizes.includes(size) && size
                    ? setSizes((x) => [...x, size])
                    : null
                }
                removeValue={(value) =>
                  setSizes((x) =>
                    x.filter(
                      (a) =>
                        a.trim().toLowerCase() !==
                        value.trim().toLocaleLowerCase()
                    )
                  )
                }
              />

              <PrimaryInputField
                type={"text"}
                placeholder=""
                name="shortDescription"
                value={values.shortDescription}
                handleChange={handleChange}
                error={touched.shortDescription && errors.shortDescription}
                label={"Short Description (max: 50) *"}
              />
              <PrimaryTextAreaField
                type={"text"}
                placeholder="Use enter to create next lines, it will be displayed exactly as typed"
                name="description"
                value={values.description}
                handleChange={handleChange}
                error={touched.description && errors.description}
                label={"Long Description *"}
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
