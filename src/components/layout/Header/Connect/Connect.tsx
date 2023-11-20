'use client'

import styles from './Connect.module.css'
import Image from "next/image";
import {useConnect} from "wagmi";
import {Dispatch, SetStateAction} from "react";
import clsx from "clsx";

const Connect = (
  {
    isConnectOpen,
    setIsConnectOpen
  }: {
    isConnectOpen: boolean,
    setIsConnectOpen: Dispatch<SetStateAction<boolean>>
  }) => {
  const {connect, connectors} = useConnect()
  return (
    <div className={clsx(styles.bg, isConnectOpen && styles.open)} onClick={() => setIsConnectOpen(false)}>
      <div className={styles.connect} onClick={e => e.stopPropagation()}>
        <span className={styles.close} onClick={() => setIsConnectOpen(false)}></span>
        <div className={styles.content}>
          <div className={styles.title}>
            Select <span>wallet</span>
            <br/>
            <p>for connect and full speed ahead</p>
          </div>
          <div className={styles.description}>
            At the moment only sign in via Metamask is available, but we will add other methods soon
          </div>
          <div className={styles.metamask} onClick={() => {
            setIsConnectOpen(false)
            connect({connector: connectors[0]})
          }}>
            <Image src='/metamask.png' alt='' width={36} height={36}/>
            <p>Metamask</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;