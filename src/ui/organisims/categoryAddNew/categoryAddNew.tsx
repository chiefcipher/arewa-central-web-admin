import React, { useState } from "react";
import styles from "./categoryAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_FormMessage } from "../../../typescript/interfaces";
import { createCategorySchema } from "../../../validations/category";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import { PrimaryField } from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
export function CategoryAddNew(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });
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
  return (
    <div className={styles.addNew}>
      <SectionHeader>Create Category</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            name: "",
            description: "",
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
