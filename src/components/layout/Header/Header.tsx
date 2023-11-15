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

const Header = () => {
  const pathname = usePathname()
  const {connect, connectors} = useConnect()
  const {switchNetwork} = useSwitchNetwork()
  const {chain} = useNetwork()
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.azuroSlice.search)
  const oddsFormat = useAppSelector(state => state.azuroSlice.oddsFormat)
  const [searchType, setSearchType] = useState('ALL')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    dispatch(clearSearch())
    let promise: any
    const timeout = setTimeout(() => {
      if (value) {
        promise = dispatch(fetchSearch({
          str: value,
          by: searchType === 'ALL' ? 'title' : 'turnover',
          direction: orderDirection
        }))
      }
    }, 1000)

    return () => {
      promise?.abort()
      clearTimeout(timeout)
    }
  }, [value, searchType, orderDirection]);

  useEffect(() => {
    if (chains[0].id !== chain?.id) {
      switchNetwork?.(chains[0].id)
    }
  }, [])

  console.log(orderDirection)

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
          {!!value && <>
            <svg className={styles.clear} onClick={() => setValue('')} width="16" height="18" viewBox="0 0 16 18"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                fill="#373737"/>
            </svg>
            <div className={styles.resultsWrapper}>
              <div className={styles.results}>
                <div className={styles.searchHeading}>
                  {['ALL', 'TOP RATED'].map(str => (
                    <span key={str} onClick={() => setSearchType(str)}
                          className={clsx(str === searchType && styles.active)}>{str}</span>
                  ))}
                </div>
                <div className={styles.searchSort}>
                  <div className={styles.amountResults}>RESULTS: <span>{search.length}</span></div>
                  <div className={clsx(styles.sort, orderDirection === "desc" && styles.desc)}
                       onClick={() => setOrderDirection(prevState => prevState === "asc" ? "desc" : "asc")}>
                    SORT
                    <span></span>
                  </div>
                </div>
                {!!search.length && search.map((event, index) => (
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
              </div>
              {!search.length && <div className={styles.empty}>
                <Image width={90} height={90} src="/sports/noEvents.png" alt=""/>
                <div>
                  We couldn't find any events matching your query. Try another query.
                </div>
              </div>}
            </div>
          </>
          }
        </div>
        <button className={clsx(styles.add, 'flexCenter')}>Add event</button>
        <div className={styles.odds}>
          {['EU', 'UK', 'US'].map(item => (
            <div onClick={() => dispatch(setOddsFormat(item as any))}
                 className={clsx(oddsFormat === item && styles.activeOdds)}>{item} <span>Odds</span></div>
          ))}
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