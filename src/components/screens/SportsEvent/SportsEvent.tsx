"use client"

import styles from './SportsEvent.module.css'
import Basket from "@/components/screens/Sports/Basket";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {fetchSportsGames, sortTime} from "@/redux/subgraph/callFunctions";
import {useRouter} from "next/navigation";
import {IBasket, IRecentlyEvent} from "@/redux/features/azuroInterface";
import {getUKOdds} from "@/utils/getUKOdds";

var odds = require('odds-converter')

const SportsEvent = ({id, league, sports}: { id: string, sports: string, league: string }) => {
  const [basket, setBasket] = useState<IBasket[]>([])
  const game = useAppSelector(state => state.azuroSlice.sports.find(item => item.slug === sports)?.games.find(item => item.id === id))
  const dispatch = useAppDispatch()
  const router = useRouter()
  const oddsFormat = useAppSelector(state => state.azuroSlice.oddsFormat)
  const [isBasketOpen, setIsBasketOpen] = useState(false)

  useEffect(() => {
    const promise = dispatch(fetchSportsGames({
      sortTime: sortTime['All'],
      filter: sports,
      league: [league],
      id: id,
    }))
    return () => promise.abort()
  }, []);

  useEffect(() => {
    if (game) {
      const currentEvent: IRecentlyEvent = {
        id: id,
        title: game.title,
        league: {
          slug: game.league.slug,
          name: game.league.name
        },
        condition: game.conditions[0].outcomes[0].outcomeId,
        sport: {
          slug: sports
        }
      }
      const events = JSON.parse(localStorage.getItem('recently') || '[]').filter((event: IRecentlyEvent) => event.id !== id)
      if (events.length === 6) events.pop()
      localStorage.setItem('recently', JSON.stringify([currentEvent, ...events]))
    }
  }, [game]);

  if (!game) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p onClick={() => router.back()}>
            <img src="/sports/arrowLeftBlue.svg" alt=""/>
            <span>BACK</span>
          </p>
          Lorem ipsum 1 - Lorem ipsum 2 Crypto Betting odds 07 October 2023
        </div>
        <div className={styles.head}>
          <div className={styles.team}>
            <div className={styles.teamImg}>
              <img src={game.participants[0].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
            </div>
            {game.title.slice(0, game.title.indexOf('-'))}
          </div>
          <div className={styles.time}>
            10:00 PM
            <span>Today</span>
          </div>
          <div className={styles.team}>
            <div className={styles.teamImg}>
              <img src={game.participants[1].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
            </div>
            {game.title.slice(game.title.indexOf('-') + 1, game.title.length)}
          </div>
        </div>
        <div className={styles.oddsWrapper}>
          {game.conditions.map((item, index) => (
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
                      return setBasket(prevState => [...prevState.map((gameBasket, index) => {
                        if (index === basketItem) return {
                          id: id,
                          outcomeId: outcome.outcomeId,
                          title: gameBasket.title,
                          conditions: [...gameBasket.conditions],
                          conditionId: item.conditionId,
                          currentOdds: outcome.currentOdds,
                        }
                        return {...gameBasket}
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
                  <span>{oddsFormat === "EU" ? Number(outcome.currentOdds).toFixed(2) :
                    oddsFormat === "UK" ? getUKOdds(Number(outcome.currentOdds)) :
                      Number(odds.decimal.toAmerican(Number(outcome.currentOdds))).toFixed(0)}</span>
                </div>))}
              </div>
            </div>))}
        </div>
      </div>
      <Basket basket={basket} setBasket={setBasket} setIsBasketOpen={setIsBasketOpen} isBasketOpen={isBasketOpen}/>
    </div>
  );
};

export default SportsEvent;