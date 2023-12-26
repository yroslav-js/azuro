"use client"

import styles from './Account.module.css'
import UserData from "@/components/screens/Account/UserData";
import WalletData from "@/components/screens/Account/WalletData";
import Referral from "@/components/screens/Account/Referral";
import {useAccount} from "wagmi";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Account = () => {
  // const {isConnected} = useAccount()
  // const router = useRouter()
  //
  // useEffect(() => {
  //   if (!isConnected) router.push('/')
  // }, [isConnected])
  //
  // if (!isConnected) return null

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