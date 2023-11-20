"use client"

import styles from './Sports.module.css'
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {useEffect, useRef, useState} from "react";
import {formatDate} from "@/utils/formatDate";
import clsx from "clsx";
import Basket from "@/components/screens/Sports/Basket";
import Link from "next/link";
import Image from "next/image";
import {setBasketEvents, setIsFilterOpen, setSortItem} from "@/redux/features/azuroSlice";
import {fetchSports, fetchSportsGames, sortTime} from "@/redux/subgraph/callFunctions";
import {usePathname, useRouter} from "next/navigation";
import {IBasket, ISortItem} from "@/redux/features/azuroInterface";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";
import {filterAmount, topEventAmount} from "@/utils/amount";
import {getUKOdds} from "@/utils/getUKOdds";

var odds = require('odds-converter')

const sortItems: ISortItem[] = ['All', 'Today', 'Tomorrow', '1h', '3h', '6h']

// all logic with basket or basketEvents

const Sports = () => {
  const sports = useAppSelector(state => state.azuroSlice.sports)
  const sort = useAppSelector(state => state.azuroSlice.sortItem)
  const sportFilter = useAppSelector(state => state.azuroSlice.sportFilter)
  const oddsFormat = useAppSelector(state => state.azuroSlice.oddsFormat)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [closedSportsIds, setClosedSportsIds] = useState<string[]>([])
  const [isBasketOpen, setIsBasketOpen] = useState(false)
  const [basket, setBasket] = useState<IBasket[]>([])
  const pathname = usePathname()
  const [firstRender, setFirstRender] = useState(true)
  const router = useRouter()
  const ref = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    isBasketOpen && dispatch(setIsFilterOpen(false))
  }, [isBasketOpen])

  useEffect(() => {
    if (pathname === '/sports') {
      const promise = dispatch(fetchSportsGames({sortTime: sortTime[sort]}))
      return () => promise.abort()
    } else {
      const pathArray = pathname.split('/')
      if (pathArray.length === 2) {
        const promise = dispatch(fetchSportsGames({sortTime: sortTime[sort]}))
        return () => promise.abort()
      } else if (pathArray.length === 3) {
        const promise = dispatch(fetchSportsGames({sortTime: sortTime[sort], filter: pathArray.pop()}))
        return () => promise.abort()
      } else if (pathArray.length === 4) {
        const promise = dispatch(fetchSportsGames({
          sortTime: sortTime[sort],
          filter: pathArray[2],
          league: pathArray.pop()?.split('%20').filter(v => v)
        }))
        return () => promise.abort()
      }
    }
  }, [pathname, sort]);

  useEffect(() => {
    dispatch(fetchSports())
  }, []);

  useEffect(() => {
    localStorage && setBasket([...JSON.parse(localStorage.getItem('basket') || '[]')])
    setFirstRender(false)
  }, []);

  useEffect(() => {
    if (!firstRender) {
      if (!basket.length) setIsBasketOpen(false)
      localStorage && localStorage.setItem('basket', JSON.stringify(basket))
      localStorage && dispatch(setBasketEvents([...basket]))
    }
  }, [basket])

  useEffect(() => {
    setLoading(false)
  }, [sports]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.tagFilterArrow} onClick={() => {
          const px = ref.current?.scrollLeft
          ref.current?.scroll({
            left: Number(px) + 300,
            behavior: 'smooth'
          })
        }}><img src="/sports/arrowRightGray.svg" alt=""/></span>
        <div className={styles.tagFilter} ref={ref}>
          <div className={clsx(styles.tag, pathname === '/sports' && styles.tagActive)}
               onClick={() => router.push('/sports/')}>
            {sportsIcon[iconsIndex["top"]]}
            Top events
            <span>{topEventAmount(sportFilter)}</span>
          </div>
          {sportFilter.map(sport => (
            <div onClick={() => router.push(`/sports/${sport.slug}`)} key={sport.slug}
                 className={clsx(styles.tag, !!pathname.split('/').find(str => str === sport.slug) && styles.tagActive)}>
              {sportsIcon[iconsIndex[sport.slug as keyof typeof iconsIndex] || 0]}
              {sport.name}
              <span>{filterAmount(sport)}</span>
            </div>))}
        </div>
        <div className={styles.contentHeading}>
          <div>Top {sports.find(sport => sport.slug === pathname.split('/sports/').pop())?.name} Events</div>
          <div className={styles.timeSort}>
            {sortItems.map((item) => (
              <div key={item} onClick={() => {
                if (sort !== item) {
                  setLoading(true)
                  dispatch(setSortItem(item))
                }
              }}
                   className={sort === item ? styles.activeSort : ''}>{item}</div>))}
          </div>
          <div className={styles.openFilter} onClick={() => dispatch(setIsFilterOpen(true))}>
            FILTER
            <img src="/sports/openFilter.svg" alt=""/>
            {!!pathname.split('/sports')[1].length &&
              <span>{pathname.split('/sports')[1].replace(/%20/gi, '/').split('/').length - 1}</span>}
          </div>
        </div>
        {!loading && sports.map(sport => sport.games.length ? (<div key={sport.name}
                                                                    className={clsx(styles.events, closedSportsIds.find(id => id === sport.sportId) !== undefined && styles.closed)}>
          <div className={styles.eventHeading} onClick={() => setClosedSportsIds(prevState => {
            if (prevState.find(id => id === sport.sportId) !== undefined) return [...prevState.filter(id => id !== sport.sportId)]
            return [...prevState, sport.sportId]
          })}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99976 20.0002C8.61642 20.0002 7.31642 19.7377 6.09976 19.2127C4.88309 18.6877 3.82476 17.9752 2.92476 17.0752C2.02476 16.1752 1.31226 15.1169 0.787256 13.9002C0.262256 12.6836 -0.000244141 11.3836 -0.000244141 10.0002C-0.000244141 8.61691 0.262256 7.31691 0.787256 6.10024C1.31226 4.88358 2.02476 3.82524 2.92476 2.92524C3.82476 2.02524 4.88309 1.31274 6.09976 0.787744C7.31642 0.262744 8.61642 0.000244141 9.99976 0.000244141C11.3831 0.000244141 12.6831 0.262744 13.8998 0.787744C15.1164 1.31274 16.1748 2.02524 17.0748 2.92524C17.9748 3.82524 18.6873 4.88358 19.2123 6.10024C19.7373 7.31691 19.9998 8.61691 19.9998 10.0002C19.9998 11.3836 19.7373 12.6836 19.2123 13.9002C18.6873 15.1169 17.9748 16.1752 17.0748 17.0752C16.1748 17.9752 15.1164 18.6877 13.8998 19.2127C12.6831 19.7377 11.3831 20.0002 9.99976 20.0002ZM14.9998 7.50024L16.3498 7.05024L16.7498 5.70024C16.2164 4.90024 15.5748 4.21274 14.8248 3.63774C14.0748 3.06274 13.2498 2.63358 12.3498 2.35024L10.9998 3.30024V4.70024L14.9998 7.50024ZM4.99976 7.50024L8.99976 4.70024V3.30024L7.64976 2.35024C6.74976 2.63358 5.92476 3.06274 5.17476 3.63774C4.42476 4.21274 3.78309 4.90024 3.24976 5.70024L3.64976 7.05024L4.99976 7.50024ZM3.94976 15.2002L5.09976 15.1002L5.84976 13.7502L4.39976 9.40024L2.99976 8.90024L1.99976 9.65024C1.99976 10.7336 2.14976 11.7211 2.44976 12.6127C2.74976 13.5044 3.24976 14.3669 3.94976 15.2002ZM9.99976 18.0002C10.4331 18.0002 10.8581 17.9669 11.2748 17.9002C11.6914 17.8336 12.0998 17.7336 12.4998 17.6002L13.1998 16.1002L12.5498 15.0002H7.44976L6.79976 16.1002L7.49976 17.6002C7.89976 17.7336 8.30809 17.8336 8.72476 17.9002C9.14142 17.9669 9.56642 18.0002 9.99976 18.0002ZM7.74976 13.0002H12.2498L13.6498 9.00024L9.99976 6.45024L6.39976 9.00024L7.74976 13.0002ZM16.0498 15.2002C16.7498 14.3669 17.2498 13.5044 17.5498 12.6127C17.8498 11.7211 17.9998 10.7336 17.9998 9.65024L16.9998 8.95024L15.5998 9.40024L14.1498 13.7502L14.8998 15.1002L16.0498 15.2002Z"
                fill="#fff"/>
            </svg>
            {sport.name.toUpperCase()}
            <img className={styles.headArrow} src="/arrow.svg" alt=""/>
          </div>
          {sport.games.map(game => (<div key={game.id} className={styles.eventWrapper}>
            <div className={styles.event}>
              <div className={styles.teamsWrapper}>
                <div className={styles.teamsHeading}>
                  <div>{game.league.name}</div>
                  <p
                    className={formatDate(+game.startsAt).includes('Today') ? styles.green : styles.blue}>{formatDate(+game.startsAt)}</p>
                  <span><img src="/share.svg" alt=""/></span>
                  <span><img src="/bookmark.svg" alt=""/></span>
                </div>
                <div className={styles.teams}>
                  <div className={styles.team}>
                    <div><span><img src={game.participants[0].image} onError={({currentTarget}) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/sports/teamImage.svg";
                    }} alt=""/></span> {game.title.slice(0, game.title.indexOf('-'))}
                    </div>
                  </div>
                  <span>vs</span>
                  <p>-</p>
                  <div className={styles.team}>
                    <div><span><img src={game.participants[1].image} onError={({currentTarget}) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/sports/teamImage.svg";
                    }} alt=""/></span> {game.title.slice(game.title.indexOf('-') + 1, game.title.length)}
                    </div>
                  </div>
                  <Link href={`/sports/${sport.slug}/${game.league.slug}/${game.id}`} className={styles.more}>
                    <div>MORE MARKETS</div>
                    <p>
                      <svg style={{transform: 'rotate(90deg)'}} width="12" height="8" viewBox="0 0 12 8" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#007AFF"/>
                      </svg>
                    </p>
                  </Link>
                </div>
              </div>
              <div className={styles.oddsWrapper}>
                {game.conditions.map((odd, i) => (
                  <div
                    className={i > 2 ? styles.displayNone : i === 2 ? styles.displayNoneFirst : i === 1 ? styles.displayNoneSecond : ''}
                    key={odd.outcomes[0].outcomeId}>
                    <div className={styles.oddsHeading}>{getMarketName({outcomeId: odd.outcomes[0].outcomeId})} <img
                      src="/sports/i.svg" alt=""/></div>
                    <div className={styles.odds}>
                      {odd.outcomes.map(outcome => (<div
                        onClick={() => {
                          const item = basket.findIndex((item) => item.id === game.id)
                          if (item !== -1) {
                            if (basket[item]?.outcomeId === outcome.outcomeId)
                              return setBasket(prevState => [...prevState.filter((_, index) => index !== item)])
                            return setBasket(prevState => [...prevState.map((event, index) => {
                              if (index === item) return {
                                id: game.id,
                                outcomeId: outcome.outcomeId,
                                conditionId: odd.conditionId,
                                currentOdds: outcome.currentOdds,
                                title: game.title,
                                conditions: [...game.conditions]
                              }
                              return {...event}
                            })])
                          }
                          setBasket((prevState): IBasket[] => [...prevState, {
                            id: game.id,
                            outcomeId: outcome.outcomeId,
                            conditionId: odd.conditionId,
                            currentOdds: outcome.currentOdds,
                            title: game.title,
                            conditions: [...game.conditions]
                          }])
                        }}
                        key={outcome.outcomeId}
                        className={clsx(styles.odd,
                          basket.find((item: any) => item.id === game.id)?.outcomeId === outcome.outcomeId && styles.activeOdd)}>
                        <div>{getSelectionName({outcomeId: outcome.outcomeId, withPoint: false})}</div>
                        <span>{
                          oddsFormat === "EU" ? Number(outcome.currentOdds).toFixed(2) :
                            oddsFormat === "UK" ? getUKOdds(Number(outcome.currentOdds)) :
                              Number(odds.decimal.toAmerican(Number(outcome.currentOdds))).toFixed(0)
                        }</span>
                      </div>))}
                    </div>
                  </div>))}
              </div>
              <Link href={`/sports/${sport.slug}/${game.league.slug}/${game.id}`} className={styles.more}>
                <div>MORE MARKETS</div>
                <p>
                  <svg style={{transform: 'rotate(90deg)'}} width="12" height="8" viewBox="0 0 12 8" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#007AFF"/>
                  </svg>
                </p>
              </Link>
            </div>
          </div>))}
        </div>) : null)}
      </div>
      <Basket basket={basket} setBasket={setBasket} setIsBasketOpen={setIsBasketOpen} isBasketOpen={isBasketOpen}/>
    </div>
  );
};

export default Sports;