import React, { useEffect, useState } from "react";
import styles from "../categoryAddNew/categoryAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_Category, I_FormMessage } from "../../../typescript/interfaces";
import { createCategorySchema } from "../../../validations/category";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import { PrimaryField } from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
export function CategoryEdit(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });
  const [categoryData, setCategoryData] = useState<I_Category | null>(null);
  useEffect(() => {
    setTimeout(() => {
      // simulate loading
      setCategoryData({
        id: "string",
        name: "string",
        createdAt: Date.now(),
        description: "string",
        productSize: 30,
      });
    }, 3000);
  }, []);
  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(values);
      actions.setSubmitting(false);
      setFormMessage({
        type: "success",
        content: values.name + " category updated successfully",
      });
      actions.resetForm();
    }, 3000);
  };
  if (!categoryData) return <LoadingUI />;
  return (
    <div className={styles.addNew}>
      <SectionHeader>Edit Category</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={categoryData}
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
              <PrimaryField
                type={"text"}
                placeholder="eg Bag"
                value={values.name}
                handleChange={handleChange}
                error={touched.name && errors.name}
                name="name"
                label={"Category Name *"}
              />
              <PrimaryField
                type={"text"}
                placeholder="a nice bag category"
                value={values.description}
                handleChange={handleChange}
                error={touched.description && errors.description}
                name="description"
                label={"Description *"}
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
