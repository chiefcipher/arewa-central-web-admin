import React, { useRef, useState } from "react";
import styles from "./profileImageUpdate.module.scss";
import { SubSectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";
import { I_Profile } from "../../../typescript/interfaces";
import { Icon } from "@iconify/react";

export function ProfileImageUpdate() {
  const fileInputRef = useRef(null);
  const [userProfile] = useState<I_Profile>({
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
  const [imageUploadStatus, setImageUploadStatus] = useState<
    "uploading" | "uploaded" | "select-image"
  >("select-image");
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>("");

  // todo make profile image come from api

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target && event.target.files && event.target.files[0];

    const maxFileSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (!file) return;
    if (file && file.size > maxFileSizeInBytes) {
      setProfileImg("");
      return alert("File too large, pick another less than 1MB");
    }
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtUppercase = file.name.split(".").pop();

    if (
      !fileExtUppercase ||
      !allowedExtensions.includes(fileExtUppercase.toLocaleLowerCase())
    )
      return alert("Kindly select a valid file (.jpg, .png or .jpeg)");

    {
      // read file
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result is a data URL representing the image
        const imageDataUrl = reader.result;
        setProfileImg(imageDataUrl);
        handleImageUpload(imageDataUrl as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (imgStr: string) => {
    setImageUploadStatus("uploading");
    setTimeout(() => {
      console.log({ imgStr });
      setImageUploadStatus("uploaded");
    }, 3000);
  };
  return (
    <div className={styles.imgContainer}>
      <SubSectionHeader>Profile Image</SubSectionHeader>
      <img
        src={profileImg as string}
        alt={`${userProfile.firstName} ${userProfile.lastName}`}
      />
      <p>
        Max File size: 1MB <br />
        Accepted Files: .png .jpeg .jpg
      </p>
      <button
        disabled={
          imageUploadStatus === "uploading" || imageUploadStatus === "uploaded"
        }
        style={{
          color: imageUploadStatus === "uploaded" ? "green" : "#0d3f7a",
        }}
        onClick={() => {
          const node = fileInputRef.current as HTMLInputElement | null;
          if (node) node.click();
        }}
      >
        {imageUploadStatus === "uploading" ? (
          <>
            <Icon icon="fa:spinner" className={"spinner"} />
            <span>Uploading...</span>
          </>
        ) : imageUploadStatus === "uploaded" ? (
          <>
            <Icon icon="mdi:account-tick" />

            <span>Uploaded </span>
          </>
        ) : (
          <>
            <Icon icon="lets-icons:save-fill" />

            <span>Change Picture </span>
          </>
        )}
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        accept="image/*"
      />
    </div>
  );
}
