import React, { useEffect, useState } from "react";
import styles from "../categoryAddNew/categoryAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_Category, I_FormMessage } from "../../../typescript/interfaces";
import { createCategorySchema } from "../../../validations/category";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import { PrimaryField, PrimaryViewField } from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { useParams } from "react-router-dom";
export function CategoryView(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });
  const { categoryId } = useParams();
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
      <SectionHeader>View Category</SectionHeader>
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
              <PrimaryViewField
                type={"text"}
                value={values.name}
                name="name"
                label={"Category Name"}
              />
              <PrimaryViewField
                type={"text"}
                value={values.description}
                name="description"
                label={"Description"}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
