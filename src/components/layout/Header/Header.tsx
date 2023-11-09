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
import {clearSearch} from "@/redux/features/azuroSlice";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";

const Header = () => {
  const pathname = usePathname()
  const {connect, connectors} = useConnect()
  const {switchNetwork} = useSwitchNetwork()
  const {chain} = useNetwork()
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.azuroSlice.search)

  useEffect(() => {
    dispatch(clearSearch())
    let promise: any
    const timeout = setTimeout(() => {
      if (value) {
        promise = dispatch(fetchSearch(value))
      }
    }, 1000)

    return () => {
      promise?.abort()
      clearTimeout(timeout)
    }
  }, [value]);

  useEffect(() => {
    if (chains[0].id !== chain?.id) {
      switchNetwork?.(chains[0].id)
    }
  }, [])

  return (
    <header className={clsx(styles.header, pathname.includes('sports') && styles.sports)}>
      <div className={clsx(styles.logo, 'flexCenter')}>
        <img src="/logo.svg" alt=""/>
      </div>
      <div className={styles.headerContent}>
        <Link href='/sports' className={/[0-9]/.test(pathname) ? styles.back : styles.backnone}>BACK</Link>
        <div className={styles.portfolioWrap}>
          <Image src='/metamask.png' alt='' width={40} height={40} onClick={() => connect({connector: connectors[0]})}/>
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
          <input type="text" value={value} onChange={e => setValue(e.target.value)} className={styles.search}
                 placeholder='Search'/>
          {!!value && <div className={styles.resultsWrapper}>
            {!!search.length && <div className={styles.results}>
              {/*<div className={styles.recently}>RECENTLY</div>*/}
              {search.map((event, index) => (
                <Link style={index % 2 ? {backgroundColor: 'rgba(225, 225, 229, 1)'} : {}}
                      href={`/sports/${event.sport.slug}/${event.league.slug}/${event.id}`} key={event.id}
                      className={styles.result}>
                  {sportsIcon[iconsIndex[event.sport.slug as keyof typeof iconsIndex] || 0]}
                  <div className={styles.resultText}>
                    <div className={styles.searchTitle}>{event.title}</div>
                    <div className={styles.searchOdd}>Full time result</div>
                    <div className={styles.searchLeague}>{event.league.name}</div>
                  </div>
                </Link>
              ))}
            </div>}
            {!search.length && <div className={styles.empty}>
              <Image width={90} height={90} src="/sports/noEvents.png" alt=""/>
              <div>
                We couldn't find any events matching your query. Try another query.
              </div>
            </div>}
          </div>}
        </div>
        <button className={clsx(styles.add, 'flexCenter')}>Add event</button>
        <div className={styles.odds}>
          <div className={styles.activeOdds}>EU <span>Odds</span></div>
          <div>UK <span>Odds</span></div>
          <div>US <span>Odds</span></div>
        </div>
        <button className={clsx(styles.notification, 'flexCenter')}><img src="/notification.svg" alt=""/></button>
        <img src="/discord.svg" alt="" className={styles.discord}/>
        {/*<button className={clsx(styles.signout, 'flexCenter')}>Sign out*/}
        {/*  /!*<img src="/logout.svg" alt=""/>*!/*/}
        {/*</button>*/}
      </div>
    </header>
  );
};

export default Header;