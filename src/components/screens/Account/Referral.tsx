"use client"

import clsx from "clsx";
import "./CommonStyle.css"
import styles from './Referral.module.css'

const Referral = () => {
  return (
    <div className={styles.referral}>
      <div className={clsx(styles.referralLinks, "accountBlock")}>
        <p className="bigTitle">referral link management</p>
        <div className={styles.subtitle}>You can create several links to invite different groups of leads</div>
        <div className={styles.linksWrapper}>
          <div className="accountSmallBlock">
            <input type="text" placeholder="Input referral link name"/>
            <button className={styles.generate}>Generate link</button>
          </div>
          {Array.from(Array(5)).map(link => (
            <div className={clsx("accountSmallBlock", styles.link)} key={link}>
              <div>Link lorem ipsum</div>
              <img src="" alt=""/>
              <span>https://link-1231122141.io</span>
              <img src="" alt=""/>
              <button>Share</button>
            </div>
          ))}
        </div>
      </div>
      <div className={clsx(styles.statisticBlock, "accountBlock")}>
        <p className="bigTitle">referral statistics</p>
        <div className={styles.statistic}></div>
        <div className="accountSmallBlock">
          <div>
            <p className="smallTitle">Referral storage contract</p>
            <span className={styles.contract}>0xbc2820e235e546a232cbfsdfsdfdsf...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;