"use client"

import styles from './Sports.module.css'
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {useEffect, useState} from "react";
import {formatDate} from "@/utils/formatDate";
import clsx from "clsx";
import Filters from "@/components/screens/Sports/Filters";
import Basket from "@/components/screens/Sports/Basket";
import Link from "next/link";
import Image from "next/image";
// import Lottie from 'react-lottie';
// import * as animationData from './Gradient-background.json'
import {setBasketEvents} from "@/redux/features/azuroSlice";
import {fetchSports, sortTime} from "@/redux/subgraph/callFunctions";

const sortItems = ['All', 'Today', 'Tomorrow', '1h', '3h', '6h']

const Sports = () => {
  const sports = useAppSelector(state => state.azuroSlice.sports)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [closedSportsIds, setClosedSportsIds] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isBasketOpen, setIsBasketOpen] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [basket, setBasket] = useState<any>([])
  const basketEvents = useAppSelector(state => state.azuroSlice.basket)
  const [sort, setSort] = useState<keyof typeof sortTime>('All')

  useEffect(() => {
    dispatch(fetchSports(sortTime[sort]))
  }, [sort]);

  useEffect(() => {
    basket.length && localStorage.setItem('basket', JSON.stringify(basket))
    basket.length && dispatch(setBasketEvents([...basket]))
  }, [basket])

  useEffect(() => {
    setBasket([...JSON.parse(localStorage.getItem('basket') || '')])
  }, []);

  useEffect(() => {
    setLoading(false)
  }, [sports]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileBasket} onClick={() => setIsBasketOpen(true)}>
        You have combo bet with 4 odds in betslip
        <Image src='/sports/basketMobile.png' alt='' width={30} height={30}/>
      </div>
      {/*<Filters isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>*/}

      {/*<Lottie options={{*/}
      {/*  loop: true,*/}
      {/*  autoplay: true,*/}
      {/*  animationData: animationData,*/}
      {/*  rendererSettings: {*/}
      {/*    preserveAspectRatio: 'xMidYMid slice'*/}
      {/*  }*/}
      {/*}}*/}
      {/*        height={400}*/}
      {/*        width={400}*/}
      {/*        isStopped={isStopped}*/}
      {/*        isPaused={isPaused}/>*/}

      <div className={styles.content}>
        <div className={styles.tagFilter}>
          <div className={styles.tag}>
            <img src="/sports/topeventsBlue.svg" alt=""/>
            Top events
            <span>34</span>
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (<div key={item} className={styles.tag}>
            <img src="/sports/ball-blue.svg" alt=""/>
            Football
            <span>34</span>
          </div>))}
        </div>
        <div className={styles.contentHeading}>
          <div>Top Events</div>
          <div className={styles.timeSort}>
            {sortItems.map((item) => (
              <div key={item} onClick={() => {
                if (!loading && sort !== item) {
                  setLoading(true)
                  setSort(item as keyof typeof sortTime)
                }
              }}
                   className={sort === item ? styles.activeSort : ''}>{item}</div>))}
            <img src="/sports/openFilter.svg" alt="" onClick={() => setIsFilterOpen(true)}/>
          </div>
        </div>
        {!loading && sports.map(sport => sport.games?.length ? (<div key={sport.name}
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
          {sport.games.slice(0, 3).map(game => (<div key={game.id} className={styles.eventWrapper}>
            <div className={styles.event}>
              <div className={styles.teamsWrapper}>
                <div className={styles.teamsHeading}>
                  <div>La Liga</div>
                  <p>{formatDate(+game.startsAt)}</p>
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
                  <Link href={`/sports/${game.id}`} className={styles.more}>
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
                          const item = basket.findIndex((item: any) => item.id === game.id)
                          if (item !== -1) {
                            if (basket[item]?.outcomeId === outcome.outcomeId)
                              return setBasket((prevState: any) => [...prevState.filter((_: any, index: number) => index !== item)])
                            return setBasket((prevState: any) => [...prevState.map((event: any, index: number) => {
                              if (index === item) return {...event, outcomeId: outcome.outcomeId}
                              return {...event}
                            })])
                          }
                          setBasket((prevState: any) => [...prevState, {
                            id: game.id,
                            outcomeId: outcome.outcomeId,
                            title: game.title,
                            conditions: [...game.conditions]
                          }])
                        }}
                        key={outcome.outcomeId}
                        className={clsx(styles.odd,
                          basket.find((item: any) => item.id === game.id)?.outcomeId === outcome.outcomeId && styles.activeOdd)}>
                        <div>{getSelectionName({outcomeId: outcome.outcomeId, withPoint: false})}</div>
                        <span>{Number(outcome.currentOdds).toFixed(2)}</span>
                      </div>))}
                    </div>
                  </div>))}
              </div>
              <Link href={`/sports/${game.id}`} className={styles.more}>
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
      {/*<Basket basket={basket} setBasket={setBasket} setIsBasketOpen={setIsBasketOpen} isBasketOpen={isBasketOpen}/>*/}
    </div>
  );
};

export default Sports;