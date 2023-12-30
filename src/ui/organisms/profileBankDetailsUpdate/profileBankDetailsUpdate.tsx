import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./profileBankDetailsUpdate.module.scss";
import { SubSectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import { Formik, Form } from "formik";

import { updateBankInfoSchema } from "../../../validations/profile";
import { NigerianBanks } from "../../../shared/assets/NigerianBanks";
export function ProfileBankDetailsUpdate() {
  const [bankInfoUpdateStatus, setBankInfoUpdateStatus] = useState<
    "updated" | "not-updated"
  >("not-updated");
  const [hasEditedProfile, setHasEditedProfile] = useState<boolean>(false);

  const handleBlur = () =>
    !hasEditedProfile ? setHasEditedProfile(true) : null;

  // updates bank info
  const handleBankInfoUpdate = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(values);
      setBankInfoUpdateStatus("updated");
      actions.setSubmitting(false);
    }, 3000);
  };
  return (
    <div className={styles.bankDetails}>
      <SubSectionHeader>Bank Details </SubSectionHeader>
      <p className={styles.promptPara}>Edit to update bank information</p>
      <div className={styles.formArea}>
        <Formik
          initialValues={{
            bankCode: "00103",
            accountNumber: "",
          }}
          validationSchema={updateBankInfoSchema}
          onSubmit={handleBankInfoUpdate}
        >
          {({ touched, values, errors, isSubmitting, handleChange }) => {
            return (
              <Form>
                <p>
                  <label htmlFor="bankName">Bank Name *</label>

                  <select
                    // onBlur={handleBlur}
                    onClick={handleBlur}
                    name={"bankCode"}
                    value={values.bankCode}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {NigerianBanks.map((bank) => (
                      <option value={bank.code} key={bank.name}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                  <span>{touched.bankCode && errors.bankCode} </span>
                </p>

                <p>
                  <label htmlFor="accountNumber">Account Number *</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={values.accountNumber}
                    onChange={handleChange}
                  />
                  <span>{touched.accountNumber && errors.accountNumber} </span>
                </p>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  title={"Click to save changes"}
                  disabled={isSubmitting || bankInfoUpdateStatus === "updated"}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="fa:spinner" className={"spinner"} />
                      <span>Updating...</span>
                    </>
                  ) : bankInfoUpdateStatus === "updated" ? (
                    <>
                      <Icon icon="mdi:account-tick" />

                      <span>Updated </span>
                    </>
                  ) : (
                    <>
                      <Icon icon="lets-icons:save-fill" />

                      <span>Update </span>
                    </>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
