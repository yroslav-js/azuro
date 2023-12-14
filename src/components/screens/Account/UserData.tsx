"use client"

import clsx from "clsx";
import styles from "@/components/screens/Account/UserData.module.css";
import "./CommonStyle.css"

const UserData = () => {
  return (
    <div className={clsx(styles.userData, "accountBlock")}>
      <div className={styles.avatar}>
        <div></div>
        <button>Change avatar</button>
      </div>
      <div className={styles.instead}>Use avatar instead of wallet icon <input type="checkbox"/></div>
      <div className={clsx(styles.nickname, "accountSmallBlock")}>
        <p className="smallTitle">Nick name</p>
        <input type="text" value={"User12345"}/>
      </div>
      <div className={clsx(styles.link, "accountSmallBlock")}>Linked</div>
    </div>
  );
};

export default UserData;