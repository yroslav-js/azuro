"use client"

import styles from './Header.module.css'
import Image from "next/image";
import clsx from "clsx";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useEffect, useState} from "react";
import {fetchSearch, fetchSportsGames, sortTime} from "@/redux/subgraph/callFunctions";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useConnect, useNetwork, useSwitchNetwork} from "wagmi";
import {chains} from "@/components/layout/WagmiAppConfig";
import {clearSearch, setOddsFormat} from "@/redux/features/azuroSlice";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";
import Search from "@/components/ui/Search/Search";

const Header = () => {
  const pathname = usePathname()
  const {connect, connectors} = useConnect()
  const {switchNetwork} = useSwitchNetwork()
  const {chain} = useNetwork()
  const dispatch = useAppDispatch()
  const oddsFormat = useAppSelector(state => state.azuroSlice.oddsFormat)


  useEffect(() => {
    if (chains[0].id !== chain?.id) {
      switchNetwork?.(chains[0].id)
    }
  }, [])

  return (
    <header className={clsx(styles.header, pathname.includes('sports') && styles.sports, 'header')}>
      <div className={clsx(styles.logo, 'flexCenter')}>
        <img src="/logo.svg" alt=""/>
      </div>
      <div className={styles.headerContent}>
        <Link href='/sports' className={/[0-9]/.test(pathname) ? styles.back : styles.backnone}>BACK</Link>
        <div className={styles.portfolioWrap}>
          <Image src='/metamask.png' alt='' width={40} height={40} onClick={() => connect({connector: connectors[0]})}/>
          <div className={styles.portfolio}>
            <div>balance</div>
            <p><img src="/tether.svg" alt=""/> 4k</p>
          </div>
        </div>
        <div className={styles.events}>
          <div className={styles.event}>All events</div>
          <div>Private events</div>
        </div>
        <Search/>
        <button className={clsx(styles.add, 'flexCenter')}>Add event</button>
        <div className={styles.odds}>
          {['EU', 'UK', 'US'].map(item => (
            <div key={item} onClick={() => dispatch(setOddsFormat(item as any))}
                 className={clsx(oddsFormat === item && styles.activeOdds)}>{item} <span>Odds</span></div>
          ))}
        </div>
        {/*<button className={clsx(styles.notification, 'flexCenter')}><img src="/notification.svg" alt=""/></button>*/}
        <img src="/discord.svg" alt="" className={styles.discord}/>
        {/*<button className={clsx(styles.signout, 'flexCenter')}>Sign out*/}
        {/*  /!*<img src="/logout.svg" alt=""/>*!/*/}
        {/*</button>*/}
      </div>
    </header>
  );
};

export default Header;