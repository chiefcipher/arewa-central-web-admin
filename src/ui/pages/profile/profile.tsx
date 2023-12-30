import React from "react";
import styles from "./profile.module.scss";
import { SectionHeader } from "../../atoms/sectionHeaders/sectionHeaders";

import { Seo } from "../../atoms/seo/seo";
import { ProfileProfileDetails } from "../../organisms/profileProfileDetails/profileProfileDetails";
import { ProfileImageUpdate } from "../../organisms/profileImageUpdate/profileImageUpdate";
import { ProfileSecurityUpdate } from "../../organisms/profileSecurityUpdate/profileSecurityUpdate";
import { ProfileBankDetailsUpdate } from "../../organisms/profileBankDetailsUpdate/profileBankDetailsUpdate";

export function Profile(): React.ReactElement {
  return (
    <div className={styles.profile}>
      <Seo title="Profile" description="User profile" />
      <SectionHeader>Profile </SectionHeader>

      <div className={styles.wrapper}>
        <div>
          <ProfileProfileDetails />
        </div>
        <div>
          <ProfileImageUpdate />
        </div>
        <div>
          <ProfileSecurityUpdate />
        </div>
        <div>
          <ProfileBankDetailsUpdate />
        </div>
      </div>
    </div>
  );
}
