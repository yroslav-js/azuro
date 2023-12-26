"use client"

import clsx from "clsx";
import styles from "@/components/screens/Account/WalletData.module.css";
import "./CommonStyle.css"
import {useAccount, useBalance} from "wagmi";
import {ZeroAddress} from "ethers";
import * as animationData from "@/components/screens/Sports/Gradient-background.json";
import Lottie from "react-lottie";

const WalletData = () => {
  const {address} = useAccount()
  const {data} = useBalance()

  return (
    <div className={clsx(styles.walletData, "accountBlock")}>
      <p className="bigTitle">deposit credential</p>
      <div className={styles.flex}>
        <div className={clsx(styles.net, "accountSmallBlock")}>
          <img src="/polygon.svg" alt=""/>
          Polygon mainnet
        </div>
        <div className={clsx(styles.address, "accountSmallBlock")}>
          <div>
            <p className="smallTitle">Replenishment address</p>
            <span>
              0xbc2820e236e5468a232Cb7cF2D9E2961859...
              {/*{address || ZeroAddress}*/}
              <img src="/copy.svg" alt=""
                   onClick={() => navigator.clipboard.writeText('0xbc2820e236e5468a232Cb7cF2D9E2961859c1D79')}/>
          </span>
          </div>
        </div>
      </div>
      <p className="bigTitle">balances</p>
      <div className={clsx(styles.balance, "accountSmallBlock")}>
        <div>
          <p className="smallTitle">Balance</p>
          <span className={styles.value}><img src="/tether.svg" alt=""/> {Number(data?.formatted || 0).toFixed(2)} USDT</span>
        </div>
        <button className={styles.walletButton}><span>Deposit</span>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              },
            }}
            isStopped={false}
            isPaused={false}/>
        </button>
      </div>
      <div className={styles.flex}>
        <div className={clsx(styles.bets, "accountSmallBlock")}>
          <div>
            <p className="smallTitle">In Bets</p>
            <span className={styles.value}><img src="/tether.svg" alt=""/> 20 USDT</span>
          </div>
        </div>
        <div className={clsx(styles.payout, "accountSmallBlock")}>
          <div>
            <p className="smallTitle">To Payout</p>
            <span className={styles.value}><img src="/tether.svg" alt=""/> 120 USDT</span>
          </div>
          <img src="/sports/arrowRightGray.svg" alt=""/>
        </div>
      </div>
      <div className={clsx(styles.stake, "accountSmallBlock")}>
        <div>
          <p className="smallTitle">Tokens in stake</p>
          <span className={styles.value}>120 PLBT</span>
        </div>
        <button className={styles.walletButton}><span>Buy tokens</span>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              },
            }}
            isStopped={false}
            isPaused={false}/>
        </button>
      </div>
      <button className={clsx(styles.disconnect, "accountSmallBlock")}>Disconnect</button>
    </div>
  );
};

export default WalletData;