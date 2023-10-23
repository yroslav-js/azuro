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

const Sports = () => {
  const sports = useAppSelector(state => state.azuroSlice.sports)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [closedSportsIds, setClosedSportsIds] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isBasketOpen, setIsBasketOpen] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [sports]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileBasket} onClick={() => setIsBasketOpen(true)}>
        You have combo bet with 4 odds in betslip
        <Image src='/sports/basketMobile.png' alt='' width={30} height={30}/>
      </div>
      <Filters isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>

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
            <div className={styles.activeSort}>All</div>
            <div>Today</div>
            <div>Tomorrow</div>
            <div>1h</div>
            <div>3h</div>
            <div>6h</div>
            <img src="/sports/openFilter.svg" alt="" onClick={() => setIsFilterOpen(true)}/>
          </div>
        </div>
        {[0, 1, 2].map(item => (<div key={item}
                                     className={clsx(styles.events, closedSportsIds.find(id => id === item) !== undefined && styles.closed)}>
          <div className={styles.eventHeading} onClick={() => setClosedSportsIds(prevState => {
            if (prevState.find(id => id === item) !== undefined) return [...prevState.filter(id => id !== item)]
            return [...prevState, item]
          })}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99976 20.0002C8.61642 20.0002 7.31642 19.7377 6.09976 19.2127C4.88309 18.6877 3.82476 17.9752 2.92476 17.0752C2.02476 16.1752 1.31226 15.1169 0.787256 13.9002C0.262256 12.6836 -0.000244141 11.3836 -0.000244141 10.0002C-0.000244141 8.61691 0.262256 7.31691 0.787256 6.10024C1.31226 4.88358 2.02476 3.82524 2.92476 2.92524C3.82476 2.02524 4.88309 1.31274 6.09976 0.787744C7.31642 0.262744 8.61642 0.000244141 9.99976 0.000244141C11.3831 0.000244141 12.6831 0.262744 13.8998 0.787744C15.1164 1.31274 16.1748 2.02524 17.0748 2.92524C17.9748 3.82524 18.6873 4.88358 19.2123 6.10024C19.7373 7.31691 19.9998 8.61691 19.9998 10.0002C19.9998 11.3836 19.7373 12.6836 19.2123 13.9002C18.6873 15.1169 17.9748 16.1752 17.0748 17.0752C16.1748 17.9752 15.1164 18.6877 13.8998 19.2127C12.6831 19.7377 11.3831 20.0002 9.99976 20.0002ZM14.9998 7.50024L16.3498 7.05024L16.7498 5.70024C16.2164 4.90024 15.5748 4.21274 14.8248 3.63774C14.0748 3.06274 13.2498 2.63358 12.3498 2.35024L10.9998 3.30024V4.70024L14.9998 7.50024ZM4.99976 7.50024L8.99976 4.70024V3.30024L7.64976 2.35024C6.74976 2.63358 5.92476 3.06274 5.17476 3.63774C4.42476 4.21274 3.78309 4.90024 3.24976 5.70024L3.64976 7.05024L4.99976 7.50024ZM3.94976 15.2002L5.09976 15.1002L5.84976 13.7502L4.39976 9.40024L2.99976 8.90024L1.99976 9.65024C1.99976 10.7336 2.14976 11.7211 2.44976 12.6127C2.74976 13.5044 3.24976 14.3669 3.94976 15.2002ZM9.99976 18.0002C10.4331 18.0002 10.8581 17.9669 11.2748 17.9002C11.6914 17.8336 12.0998 17.7336 12.4998 17.6002L13.1998 16.1002L12.5498 15.0002H7.44976L6.79976 16.1002L7.49976 17.6002C7.89976 17.7336 8.30809 17.8336 8.72476 17.9002C9.14142 17.9669 9.56642 18.0002 9.99976 18.0002ZM7.74976 13.0002H12.2498L13.6498 9.00024L9.99976 6.45024L6.39976 9.00024L7.74976 13.0002ZM16.0498 15.2002C16.7498 14.3669 17.2498 13.5044 17.5498 12.6127C17.8498 11.7211 17.9998 10.7336 17.9998 9.65024L16.9998 8.95024L15.5998 9.40024L14.1498 13.7502L14.8998 15.1002L16.0498 15.2002Z"
                fill="#fff"/>
            </svg>
            FOOTBALL
            <img className={styles.headArrow} src="/arrow.svg" alt=""/>
          </div>
          {[0, 1, 2].map(item => (<div key={item} className={styles.eventWrapper}>
            <div className={styles.event}>
              <div className={styles.teamsWrapper}>
                <div className={styles.teamsHeading}>
                  <div>La Liga</div>
                  <p>Today 12:00</p>
                  <span><img src="/share.svg" alt=""/></span>
                  <span><img src="/bookmark.svg" alt=""/></span>
                </div>
                <div className={styles.teams}>
                  <div className={styles.team}>
                    <div><span><img src="/sports/team1.png" alt=""/></span> Celta Vigo</div>
                  </div>
                  <span>vs</span>
                  <p>-</p>
                  <div className={styles.team}>
                    <div><span><img src="/sports/team2.png" alt=""/></span> Alaves</div>
                  </div>
                  <Link href='/sports/1' className={styles.more}>
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
                {[0, 1].map(item => (<div key={item}>
                  <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                  <div className={styles.odds}>
                    {[0, 1].map(item => (<div key={item} className={styles.odd}>
                      <div>1</div>
                      <span>1.69</span>
                    </div>))}
                  </div>
                </div>))}
                <div key={item}>
                  <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                  <div className={styles.odds}>
                    {[0, 1, 2].map(item => (<div key={item} className={styles.odd}>
                      <div>1</div>
                      <span>1.69</span>
                    </div>))}
                  </div>
                </div>
              </div>
              <Link href='/sports/1' className={styles.more}>
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
        </div>))}
      </div>
      <Basket setIsBasketOpen={setIsBasketOpen} isBasketOpen={isBasketOpen}/>
    </div>
  );
};

export default Sports;