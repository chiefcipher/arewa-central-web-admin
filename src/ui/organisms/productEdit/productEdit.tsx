import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "../productAddNew/productAddNew.module.scss";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { I_FormMessage, I_Product } from "../../../typescript/interfaces";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import {
  PrimarySelectMultipleImageField,
  PrimaryInputField,
  PrimarySelectField,
  PrimaryTextAreaField,
  PrimaryVariableSelectorField,
} from "../../atoms/fields/fields";
import { SubmitBtn } from "../../atoms/submitBtn/submitBtn";
import { formatCurrency } from "../../../typescript/utils";
import { createProductSchema } from "../../../validations/product";
import { SAMPLE_PRODUCT } from "../../../shared/sampleProduct";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";

const sampleCategory = {
  id: "random-id",
  name: "Bag",
  createdAt: Date.now(),
  description: "A nice category",
  productSize: 40,
};
export function ProductEdit(): JSX.Element {
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "",
  });
  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  const [base64Images, setBase64Images] = useState<Array<string>>([]);
  const [imageProcessingError, setImageProcessingError] = useState<string>("");
  const [sampleProduct, setSampleProduct] = useState<I_Product | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setSampleProduct(SAMPLE_PRODUCT);
      setColors(sampleProduct?.colors || []);
      setSizes(sampleProduct?.sizes || []);
      setBase64Images(sampleProduct?.images || []);
    }, 1000);
  }, []);
  const handleSubmit = (values: any, actions: any) => {
    if (
      imageProcessingError ||
      base64Images.length < 3 ||
      base64Images.length > 5
    ) {
      setImageProcessingError(
        imageProcessingError || "Error Processing Images"
      );
      actions.setSubmitting(false);
      return;
    }
    const data = JSON.stringify({
      ...values,
      colors,
      sizes,
      images: base64Images,
    });

    setTimeout(() => {
      console.log(data);
      localStorage.setItem("sample-product", data);
      actions.setSubmitting(false);
      setFormMessage({
        type: "success",
        content: values.name + " product updated successfully",
      });
      actions.setSubmitting(false);
      actions.resetForm();
    }, 3000);
  };

  // use effect for sizes array changes
  useEffect(() => {
    setSize((x) => (x ? "" : x));
  }, [sizes]);
  // use effect for colors array changes
  useEffect(() => {
    setColor((x) => (x ? "" : x));
  }, [colors]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target && event.target.files;
      const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

      if (!files || files.length < 3 || files.length > 5) {
        setImageProcessingError(
          "You must select at least 3 files and at most 5 files"
        );
        return;
      }

      // verify files sizes
      const thereIsALargeFile = Array.from(files).find(
        (file) => file.size > maxFileSizeInBytes
      );
      if (thereIsALargeFile) {
        setImageProcessingError(
          "A file is too large, ensure each file is below 2MB"
        );
        return;
      }
      // verify file extension
      const allowedFileExtension = ["png", "jpeg", "jpg"];
      const thereIsInvalidExtension = Array.from(files).find((file) => {
        const fileExtension = file?.name.split(".").pop();

        if (
          !fileExtension ||
          !allowedFileExtension.includes(fileExtension.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      if (thereIsInvalidExtension) {
        setImageProcessingError("Kindly select only jpeg, jpg or png files");
        return;
      }

      try {
        const base64Promises = Array.from(files).map((file) =>
          convertToBase64(file)
        );
        const base64Results = await Promise.all(base64Promises);
        setBase64Images(base64Results as string[]);
        if (imageProcessingError) setImageProcessingError("");
      } catch (err) {
        setImageProcessingError("Error Processing Images");
      }
    },
    []
  );

  const convertToBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        //img url
        const imgUrl = reader.result;
        resolve(imgUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  if (!sampleProduct) return <LoadingUI />;

  return (
    <div className={styles.addNew}>
      <SectionHeader>Update Product</SectionHeader>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            name: sampleProduct.name || "",
            category: sampleProduct.category || "",
            price: sampleProduct.price || "",
            discountedPrice: sampleProduct.discountedPrice || "",
            shortDescription: sampleProduct.shortDescription || "",
            description: sampleProduct.description || "",
            quantityLeft: sampleProduct.quantityLeft || "",
            brand: sampleProduct.brand || "",
            model: sampleProduct.model || "",
            sizes: sampleProduct.sizes || [],
            colors: sampleProduct.colors || [],
          }}
          validationSchema={createProductSchema}
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
                type={"number"}
                placeholder="0"
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
              <PrimarySelectMultipleImageField
                name="images"
                label="Select Images *"
                error={imageProcessingError}
                handleChange={handleFileChange}
                base64Images={base64Images}
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
