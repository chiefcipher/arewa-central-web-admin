import React, { useState } from "react";
import styles from "./profileProfileDetails.module.scss";
import { SubSectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";

import { I_FormMessage, I_Profile } from "../../../typescript/interfaces";
import { Icon } from "@iconify/react";
import { Form, Formik } from "formik";
import { FormMessage } from "../../atoms/formMessage/formMessage";
import { NigerianStates } from "../../../shared/NigerianStates";
import { profileUpdateSchema } from "../../../validations/profile";

export function ProfileProfileDetails() {
  const [userProfile, setUserProfile] = useState<I_Profile>({
    firstName: "John",
    phoneNumber: "234905858558",
    email: "testemail@gmail.com",
    lastName: "",
    residentState: "",
    address: "",
    imgUrl: "",
    isVerified: true,
    bankDetails: {
      bankName: "",
      accountNumber: "",
    },
  });
  const [hasEditedProfile, setHasEditedProfile] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<I_FormMessage>({
    type: "",
    content: "Edit to make changes",
  });
  const [verificationMailStatus, setVerificationMailStatus] = useState<
    "sending" | "not-sent" | "sent"
  >("not-sent");
  const handleProfileUpdateSubmit = (values: any, actions: any) => {
    console.log(values);
    actions.setSubmitting(true);
    setTimeout(() => {
      actions.setSubmitting(false);
      setFormMessage({ type: "success", content: "Updated Successfully" });
    }, 3000);
  };
  const sendVerificationMail = () => {
    setVerificationMailStatus("sending");
    setTimeout(() => {
      setVerificationMailStatus("sent");
    }, 3000);
  };
  const handleBlur = () =>
    !hasEditedProfile ? setHasEditedProfile(true) : null;

  return (
    <div className={styles.profileDetails}>
      <SubSectionHeader>Profile Details</SubSectionHeader>
      <p className={styles.promptPara}>Edit to update profile information</p>
      <Formik
        initialValues={userProfile}
        onSubmit={handleProfileUpdateSubmit}
        validationSchema={profileUpdateSchema}
      >
        {({ values, touched, handleChange, errors, isSubmitting }) => (
          <Form>
            <p>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name={"email"}
                defaultValue={values.email}
                readOnly
              />

              {values.isVerified ? (
                <span className={styles.verifiedEmail}>Verified</span>
              ) : (
                <>
                  <span>Not Verified</span>
                  <button
                    type="button"
                    onClick={sendVerificationMail}
                    disabled={verificationMailStatus !== "not-sent"}
                  >
                    {verificationMailStatus === "sending" ? (
                      <>
                        <Icon icon="fa:spinner" className={"spinner"} />

                        <span>Processing...</span>
                      </>
                    ) : verificationMailStatus === "sent" ? (
                      <>
                        <Icon icon="charm:circle-tick" />
                        <span>Check Mail</span>
                      </>
                    ) : (
                      <>
                        <Icon icon="fluent:mail-20-filled" />
                        <span>Send mail</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </p>
            <p>
              <label htmlFor="tel">Contact No:</label>
              <input
                type="tel"
                onBlur={handleBlur}
                name={"phoneNumber"}
                placeholder="234 1234567890"
                value={values.phoneNumber}
                onChange={handleChange}
              />
              <span>{touched.phoneNumber && errors.phoneNumber}</span>
            </p>
            <p>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                onBlur={handleBlur}
                name={"firstName"}
                value={values.firstName}
                onChange={handleChange}
              />
              <span>{touched.firstName && errors.firstName}</span>
            </p>
            <p>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                onBlur={handleBlur}
                name={"lastName"}
                value={values.lastName}
                onChange={handleChange}
              />
              <span>{touched.lastName && errors.lastName}</span>
            </p>

            <p>
              <label htmlFor="residentState">State of residence:</label>
              <select
                // onBlur={handleBlur}
                onClick={handleBlur}
                name={"residentState"}
                value={values.residentState}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {NigerianStates.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </select>

              <span>{touched.residentState && errors.residentState}</span>
            </p>

            <p>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                onBlur={handleBlur}
                name={"address"}
                value={values.address}
                onChange={handleChange}
              />
              <span>{touched.address && errors.address}</span>
            </p>
            <div style={{ fontSize: "1rem" }}>
              <FormMessage {...formMessage} />
            </div>
            {
              <button
                type="submit"
                className={styles.submitBtn}
                title={
                  !hasEditedProfile
                    ? "Edit profile to enable this button"
                    : "Click to save changes"
                }
                disabled={isSubmitting || !hasEditedProfile}
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="fa:spinner" className={"spinner"} />
                    <span>Processing</span>
                  </>
                ) : (
                  <>
                    <Icon icon="lets-icons:save-fill" />

                    <span>Save Changes</span>
                  </>
                )}
              </button>
            }
          </Form>
        )}
      </Formik>
    </div>
  );
}
