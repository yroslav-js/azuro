"use client"

import styles from './Account.module.css'
import UserData from "@/components/screens/Account/UserData";
import WalletData from "@/components/screens/Account/WalletData";
import Referral from "@/components/screens/Account/Referral";

const Account = () => {

  return (
    <div className={styles.page}>
      <p>User account</p>
      <div className={styles.content}>
        <div className={styles.user}>
          <UserData/>
          <WalletData/>
        </div>
        <Referral/>
      </div>
    </div>
  );
};

export default Account;