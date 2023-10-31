"use client"

import styles from './Header.module.css'
import Image from "next/image";
import clsx from "clsx";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useEffect} from "react";
import {fetchSportsGames, sortTime} from "@/redux/subgraph/callFunctions";
import {usePathname} from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname()

  return (
    <header className={clsx(styles.header, pathname.includes('sports') && styles.sports)}>
      <div className={clsx(styles.logo, 'flexCenter')}>
        <img src="/logo.svg" alt=""/>
      </div>
      <div className={styles.headerContent}>
        <Link href='/sports' className={/[0-9]/.test(pathname) ? styles.back : styles.backnone}>BACK</Link>
        <div className={styles.portfolioWrap}>
          <Image src='/metamask.png' alt='' width={40} height={40}/>
          <div className={styles.portfolio}>
            <div>portfolio</div>
            <p><img src="/tether.svg" alt=""/> 4k</p>
          </div>
        </div>
        <div className={styles.events}>
          <div className={styles.event}>All events</div>
          <div>Private events</div>
        </div>
        <div className={styles.input}>
          <input type="text" className={styles.search} placeholder='Search'/>
        </div>
        <button className={clsx(styles.add, 'flexCenter')}>Add event</button>
        <div className={styles.odds}>
          <div className={styles.activeOdds}>EU <span>Odds</span></div>
          <div>UK <span>Odds</span></div>
          <div>US <span>Odds</span></div>
        </div>
        <button className={clsx(styles.notification, 'flexCenter')}><img src="/notification.svg" alt=""/></button>
        <img src="/discord.svg" alt="" className={styles.discord}/>
        <button className={clsx(styles.signout, 'flexCenter')}>Sign out
          {/*<img src="/logout.svg" alt=""/>*/}
        </button>
      </div>
    </header>
  );
};

export default Header;