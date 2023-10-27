"use client"

import styles from './Event.module.css'
import Filters from "@/components/screens/Sports/Filters";
import Basket from "@/components/screens/Sports/Basket";
import Link from "next/link";
import clsx from "clsx";
import {useState} from "react";
import {useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";

const Event = ({id}: { id: string }) => {
  const [basket, setBasket] = useState<any>([])
  const game = useAppSelector(state => state.azuroSlice.sports.map(sport => sport.games.find(game => game.id === id)).filter(item => item))
  const event = game?.length ? game[0] : undefined

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Filters/>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <Link href='/sports'>
            <img src="/sports/arrowLeftBlue.svg" alt=""/>
            <span>BACK</span>
          </Link>
          Lorem ipsum 1 - Lorem ipsum 2 Crypto Betting odds 07 October 2023
        </div>
        <div className={styles.head}>
          <div className={styles.team}>
            <div className={styles.teamImg}>
              <img src={event?.participants[0].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
            </div>
            {event?.title.slice(0, event?.title.indexOf('-'))}
          </div>
          <div className={styles.time}>
            10:00 PM
            <span>Today</span>
          </div>
          <div className={styles.team}>
            <div className={styles.teamImg}>
              <img src={event?.participants[1].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
            </div>
            {event?.title.slice(event?.title.indexOf('-') + 1, event?.title.length)}
          </div>
        </div>
        <div className={styles.oddsWrapper}>
          {event?.conditions.map((item, index) => (
            <div
              className={event.conditions.length - 1 === index && event.conditions.length % 2 !== 0 ? styles.oddsLast : ''}
              key={item.outcomes[0].outcomeId}>
              <div className={styles.oddsTitle}>
                <span>{getMarketName({outcomeId: item.outcomes[0].outcomeId})} <img src="/sports/i.svg" alt=""/></span>
                <img src="/sports/arrowUpBlue.svg" alt=""/>
              </div>
              <div
                className={clsx(styles.odds,
                  item.outcomes.length === 3 ? styles.oddsThree : styles.oddsEven)}>
                {item.outcomes.map(outcome => (<div
                  onClick={() => {
                    const item = basket.findIndex((item: any) => item.id === id)
                    if (item !== -1) {
                      if (basket[item]?.outcomeId === outcome.outcomeId)
                        return setBasket((prevState: any) => [...prevState.filter((_: any, index: number) => index !== item)])
                      return setBasket((prevState: any) => [...prevState.map((event: any, index: number) => {
                        if (index === item) return {...event, outcomeId: outcome.outcomeId}
                        return {...event}
                      })])
                    }
                    setBasket((prevState: any) => [...prevState, {
                      id: id,
                      outcomeId: outcome.outcomeId,
                      title: event.title,
                      conditions: [...event.conditions]
                    }])
                  }}
                  key={outcome.outcomeId} className={clsx(styles.odd,
                  basket.find((item: any) => item.id === id)?.outcomeId === outcome.outcomeId && styles.activeOdd)}>
                  {getSelectionName({outcomeId: outcome.outcomeId, withPoint: false})}
                  <span>{Number(outcome.currentOdds).toFixed(2)}</span>
                </div>))}
              </div>
            </div>))}
          {/*<div>*/}
          {/*  <div className={styles.oddsTitle}>*/}
          {/*    <span>Both Teams To Score <img src="/sports/i.svg" alt=""/></span>*/}
          {/*    <img src="/sports/arrowUpBlue.svg" alt=""/>*/}
          {/*  </div>*/}
          {/*  <div className={clsx(styles.odds, styles.oddsEven)}>*/}
          {/*    {[0, 1].map(item => (<div key={item} className={styles.odd}>*/}
          {/*      Yes <span>1.69</span>*/}
          {/*    </div>))}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*{[0, 1, 2].map(item => (<div key={item}>*/}
          {/*  <div className={styles.oddsTitle}>*/}
          {/*    <span>Both Teams To Score <img src="/sports/i.svg" alt=""/></span>*/}
          {/*    <img src="/sports/arrowUpBlue.svg" alt=""/>*/}
          {/*  </div>*/}
          {/*  <div className={clsx(styles.odds, styles.oddsEven)}>*/}
          {/*    {[0, 1, 2, 3].map(item => (<div key={item} className={styles.odd}>*/}
          {/*      Yes <span>1.69</span>*/}
          {/*    </div>))}*/}
          {/*  </div>*/}
          {/*</div>))}*/}
          {/*<div className={styles.oddsLast}>*/}
          {/*  <div className={styles.oddsTitle}>*/}
          {/*    <span>Total Goals <img src="/sports/i.svg" alt=""/></span>*/}
          {/*    <img src="/sports/arrowUpBlue.svg" alt=""/>*/}
          {/*  </div>*/}
          {/*  <div className={styles.odds}>*/}
          {/*    {[0, 1, 2, 3].map(item => (<div key={item} className={styles.odd}>*/}
          {/*      Over <span>1.69</span>*/}
          {/*    </div>))}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
      <Basket basket={basket} setBasket={setBasket}/>
    </div>
  );
};

export default Event;