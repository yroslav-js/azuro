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

const Sports = () => {
  const sports = useAppSelector(state => state.azuroSlice.sports)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [sports]);

  return (
    <div className={styles.wrapper}>
      <Filters/>
      {/*<div style={{position: 'relative'}}>*/}
      {/*  <button onClick={() => {*/}
      {/*    console.log('click1')*/}
      {/*  }}>click111111*/}
      {/*  </button>*/}
      {/*  <button style={{position: 'absolute', top: '4px', left: 0, opacity: 0, pointerEvents: "none"}} onClick={() => {*/}
      {/*    console.log('click2')*/}
      {/*  }}>click222222*/}
      {/*  </button>*/}
      {/*</div>*/}

      <div className={styles.content}>
        <div className={styles.contentHeading}>
          <div>Top Events</div>
          <div className={styles.timeSort}>
            <div className={styles.activeSort}>All</div>
            <div>Today</div>
            <div>Tomorrow</div>
            <div>1h</div>
            <div>3h</div>
            <div>6h</div>
          </div>
        </div>
        {[0, 1, 2].map(item => (<div key={item} className={styles.events}>
          <div className={styles.eventHeading}>
            <img src="/sports/ball-blue.svg" alt=""/> FOOTBALL
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
                    <div><span></span> Celta Vigo</div>
                  </div>
                  vs
                  <div className={styles.team}>
                    <div><span></span> Alaves</div>
                  </div>
                </div>
              </div>
              {[0, 1].map(item => (<div key={item} className={styles.oddsWrapper}>
                <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                <div className={styles.odds}>
                  {[0, 1].map(item => (<div key={item} className={styles.odd}>
                    <div>1</div>
                    <span>1.69</span>
                  </div>))}
                </div>
              </div>))}
              <div key={item} className={styles.oddsWrapper}>
                <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                <div className={styles.odds}>
                  {[0, 1, 2].map(item => (<div key={item} className={styles.odd}>
                    <div>1</div>
                    <span>1.69</span>
                  </div>))}
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
        <div className={styles.events}>
          <div className={styles.eventHeading}>
            <img src="/sports/ball-blue.svg" alt=""/> BASKETBALL
            <img className={styles.headArrow} src="/arrow.svg" alt=""/>
          </div>
          {[0].map(item => (<div key={item} className={styles.eventWrapper}>
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
                    <div><span></span> Celta Vigo</div>
                  </div>
                  vs
                  <div className={styles.team}>
                    <div><span></span> Alaves</div>
                  </div>
                </div>
              </div>
              {[0].map(item => (<div key={item} className={styles.oddsWrapper}>
                <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                <div className={styles.odds}>
                  {[0, 1].map(item => (<div key={item} className={styles.odd}>
                    <div>1</div>
                    <span>1.69</span>
                  </div>))}
                </div>
              </div>))}
              <div className={styles.more}>
                <div>MORE MARKETS</div>
                <p>
                  <svg style={{transform: 'rotate(90deg)'}} width="12" height="8" viewBox="0 0 12 8" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#007AFF"/>
                  </svg>
                </p>
              </div>
            </div>
          </div>))}
        </div>
        <div className={styles.events}>
          <div className={styles.eventHeading}>
            <img src="/sports/ball-blue.svg" alt=""/> TENNIS
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
                    <div><span></span> Celta Vigo</div>
                  </div>
                  vs
                  <div className={styles.team}>
                    <div><span></span> Alaves</div>
                  </div>
                </div>
              </div>
              {[0, 1].map(item => (<div key={item} className={styles.oddsWrapper}>
                <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                <div className={styles.odds}>
                  {[0, 1].map(item => (<div key={item} className={styles.odd}>
                    <div>1</div>
                    <span>1.69</span>
                  </div>))}
                </div>
              </div>))}
              <div key={item} className={styles.oddsWrapper}>
                <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
                <div className={styles.odds}>
                  {[0, 1].map(item => (<div key={item} className={styles.odd}>
                    <div>1</div>
                    <span>1.69</span>
                  </div>))}
                </div>
              </div>
              <div className={styles.more}>
                <div>MORE MARKETS</div>
                <p>
                  <svg style={{transform: 'rotate(90deg)'}} width="12" height="8" viewBox="0 0 12 8" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#007AFF"/>
                  </svg>
                </p>
              </div>
            </div>
          </div>))}
        </div>
      </div>

      <Basket/>
    </div>
  );
};

export default Sports;