"use client"

import styles from './Header.module.css'
import Image from "next/image";
import clsx from "clsx";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useAccount} from "wagmi";
import {setOddsFormat} from "@/redux/features/azuroSlice";
import Search from "@/components/ui/Search/Search";
import dynamic from "next/dynamic";
import Connect from "@/components/layout/Header/Connect/Connect";

const Balance = dynamic(() => import('@/components/layout/Header/Balance'), {
  ssr: false
})

const Header = () => {
  const pathname = usePathname()
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const dispatch = useAppDispatch()
  const oddsFormat = useAppSelector(state => state.azuroSlice.oddsFormat)
  const {isConnected} = useAccount()
  const [event, setEvent] = useState('All')
  const [createEvent, setCreateEvent] = useState(false)
  const page = pathname.split('/')[1];

  return (
    <header
      className={clsx(styles.header, page === 'sports' && styles.sports, (page === 'main' || !page) && styles.main, 'header')}>
      <Connect isConnectOpen={isConnectOpen}
               setIsConnectOpen={setIsConnectOpen}/>
      <div className={clsx(styles.logo, 'flexCenter')}>
        <img src="/logo.svg" alt=""/>
      </div>
      <div className={styles.headerContent}>
        <Link href='/sports' className={/[0-9]/.test(pathname) ? styles.back : styles.backnone}>BACK</Link>
        <div className={styles.portfolioWrap}>
          <Link href="/account">
            <Image src='/metamask.png' alt='' width={40} height={40}
                   onClick={e => {
                     if (!isConnected) {
                       e.stopPropagation()
                       setIsConnectOpen(true)
                     }
                   }}/>
          </Link>
          <Balance/>
        </div>
        {page !== 'sports' && page !== 'my-bets' &&
          <div className={styles.events}>
            {['All', 'Private'].map(item => (
              <div className={event === item ? styles.event : ''} onClick={() => setEvent(item)}
                   key={item}>{item} events</div>
            ))}
          </div>
        }
        <Search/>
        {page !== 'sports' && page !== 'my-bets' && <>
          <button className={clsx(styles.add, 'flexCenter')} onClick={() => setCreateEvent(true)}>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="white"/>
            </svg>
            Create event
          </button>
          <div className={clsx(styles.createEvent, createEvent && styles.openCreateEvent)}
               onClick={() => setCreateEvent(false)}>
            <div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#878787"/>
              </svg>
              Create event
            </div>
            <Link href={'/main/create-event/public'}>Public event</Link>
            <Link href={'/main/create-event/private'}>Private event</Link>
          </div>
        </>
        }
        <div className={styles.odds}>
          {['EU', 'UK', 'US'].map(item => (
            <div key={item} onClick={() => dispatch(setOddsFormat(item as any))}
                 className={clsx(oddsFormat === item && styles.activeOdds)}>{item} <span>Odds</span></div>
          ))}
        </div>
        {/*<button className={clsx(styles.notification, 'flexCenter')}><img src="/notification.svg" alt=""/></button>*/}
        {/*<img src="/discord.svg" alt="" className={styles.discord}/>*/}
        {/*<button className={clsx(styles.signout, 'flexCenter')}>Sign out*/}
        {/*  /!*<img src="/logout.svg" alt=""/>*!/*/}
        {/*</button>*/}
      </div>
    </header>
  );
};

export default Header;