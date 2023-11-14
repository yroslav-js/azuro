"use client"

import styles from './Event.module.css'
import Filters from "@/components/screens/Sports/Filters";
import Basket from "@/components/screens/Sports/Basket";
import Link from "next/link";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {fetchSports, fetchSportsGames, sortTime} from "@/redux/subgraph/callFunctions";
import {usePathname} from "next/navigation";
import {IBasket} from "@/redux/features/azuroInterface";

const Event = ({id, league, sports}: { id: string, sports: string, league: string }) => {
  const [basket, setBasket] = useState<IBasket[]>([])
  const game = useAppSelector(state => state.azuroSlice.sports.find(sport => sport.slug === sports)?.games.find(game => game.id === id))
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!game) {
      if (pathname === '/sports') {
        const promise = dispatch(fetchSportsGames({sortTime: sortTime['All']}))
        return () => promise.abort()
      } else {
        const promise = dispatch(fetchSportsGames({
          sortTime: sortTime['All'],
          filter: pathname.split('/sports/').pop()
        }))
        return () => promise.abort()
      }
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(fetchSports())
  }, []);

  return (
    <div className={styles.wrapper}>
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
              <img src={game?.participants[0].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
            </div>
            {game?.title.slice(0, game?.title.indexOf('-'))}
          </div>
          <div className={styles.time}>
            10:00 PM
            <span>Today</span>
          </div>
          <div className={styles.team}>
            <div className={styles.teamImg}>
              <img src={game?.participants[1].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
            </div>
            {game?.title.slice(game?.title.indexOf('-') + 1, game?.title.length)}
          </div>
        </div>
        <div className={styles.oddsWrapper}>
          {game?.conditions.map((item, index) => (
            <div
              className={game.conditions.length - 1 === index && game.conditions.length % 2 !== 0 ? styles.oddsLast : ''}
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
                    const basketItem = basket.findIndex((item) => item.id === id)
                    if (basketItem !== -1) {
                      if (basket[basketItem]?.outcomeId === outcome.outcomeId)
                        return setBasket(prevState => [...prevState.filter((_, index) => index !== basketItem)])
                      return setBasket(prevState => [...prevState.map((game, index) => {
                        if (index === basketItem) return {
                          id: id,
                          outcomeId: outcome.outcomeId,
                          title: game.title,
                          conditions: [...game.conditions],
                          conditionId: item.conditionId,
                          currentOdds: outcome.currentOdds,
                        }
                        return {...game}
                      })])
                    }
                    setBasket(prevState => [...prevState, {
                      id: id,
                      outcomeId: outcome.outcomeId,
                      title: game.title,
                      conditions: [...game.conditions],
                      conditionId: item.conditionId,
                      currentOdds: outcome.currentOdds,
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