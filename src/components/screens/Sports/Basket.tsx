"use client"

import styles from './Basket.module.css'
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {setBasketEvents} from "@/redux/features/azuroSlice";

const Basket = ({isBasketOpen = false, setIsBasketOpen = () => ({}), basket, setBasket}: {
  basket: any,
  setBasket: any,
  isBasketOpen?: boolean,
  setIsBasketOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const basketEvents = useAppSelector(state => state.azuroSlice.basket)
  const dispatch = useAppDispatch()

  useEffect(() => {
    basket?.length && localStorage.setItem('basket', JSON.stringify(basket))
    basket?.length && dispatch(setBasketEvents([...basket]))
  }, [basket])

  useEffect(() => {
    if (setBasket) setBasket([...JSON.parse(localStorage.getItem('basket') || '')])
  }, []);

  return (
    <div className={clsx(styles.basket, isBasketOpen && styles.open)}>
      <div className={styles.closeModal} onClick={() => setIsBasketOpen(false)}></div>
      <div className={styles.basketHeading}>
        <div>Bet slip</div>
        {/*<div>My Bets</div>*/}
      </div>
      {/*<div className={styles.emptyBasket}>*/}
      {/*  <img src="" alt=""/>*/}
      {/*  <p>To add a bet to your betslip, choose a market and make your selection</p>*/}
      {/*  <button>How to play</button>*/}
      {/*</div>*/}
      <div className={styles.basketContent}>
        <div className={styles.betType}>
          <div className={styles.betTypeActive}>Ordinar</div>
          <div>Combo</div>
        </div>
        <div className={styles.selectionText}>Amount for each selection</div>
        <div className={styles.selection}>
          <div className={styles.selectionSelect}>
            <div>Amount</div>
            <div className={clsx(styles.activeSelection, styles.selectionLong)}>Distribute</div>
          </div>
          <div className={clsx(styles.selectionAmount, styles.activeSelectionAmount)}>10$</div>
          <div className={styles.selectionAmount}>25$</div>
          <div className={styles.selectionAmount}>50$</div>
          <div className={styles.selectionAmount}>100$</div>
        </div>
        {!!basket?.length && basketEvents.map(item => (<div key={item.id} className={styles.event}>
          <div className={styles.eventHead}>
            <img className={styles.flag} src="/sports/flag.png" alt=""/>
            {item.title}
            <img className={styles.delete} src="/sports/garbage.svg" alt=""/>
          </div>
          <div className={styles.oddsWrapper}>
            {item.conditions?.map(outcome => (<div key={outcome.outcomes[0].outcomeId}>
              <div className={styles.oddsHeading}>{getMarketName({outcomeId: outcome.outcomes[0].outcomeId})}</div>
              <div className={styles.odds}>
                {outcome.outcomes.map(odd => (<div onClick={() => {
                  const indexItem = basket.findIndex((indexItem: any) => indexItem.id === item.id)
                  if (indexItem !== -1) {
                    if (basket[indexItem]?.outcomeId === odd.outcomeId)
                      return setBasket((prevState: any) => [...prevState.filter((_: any, index: number) => index !== indexItem)])
                    return setBasket((prevState: any) => [...prevState.map((event: any, index: number) => {
                      if (index === indexItem) return {...event, outcomeId: odd.outcomeId}
                      return {...event}
                    })])
                  }
                  setBasket((prevState: any) => [...prevState, {
                    id: item.id,
                    outcomeId: odd.outcomeId,
                    title: item.title,
                    conditions: [...item.conditions]
                  }])
                }} key={odd.outcomeId} className={clsx(styles.odd,
                  item.outcomeId === odd.outcomeId && styles.activeOdd)}>
                  <div>{getSelectionName({outcomeId: odd.outcomeId, withPoint: false})}</div>
                  <span>{Number(odd.currentOdds).toFixed(2)}</span>
                </div>))}
              </div>
            </div>))}
          </div>
          <div className={styles.amount}>
            <input type="number"/>
            <div>200$</div>
            <div>50$</div>
            <div>10%</div>
          </div>
        </div>))}
        <div className={styles.total}>
          <div className={styles.totalOddsText}><span>Total odds</span><span>6.76</span></div>
          <div className={styles.totalReturnText}><span>Total potential return</span><span className={styles.blue}>$ 67.7</span>
          </div>
          {[0, 1, 2, 3].map(item => (<div className={styles.totalEvents} key={item}>
            <img src="/sports/garbageGray.svg" alt=""/>
            <div className={styles.totalEvent}>
              <span className={styles.eventName}>1x </span>
              <span className={styles.eventOdds}>1.69</span>
              <span className={styles.eventTeam}>/ Celta Vigo - Alaves</span>
              <span className={styles.eventCost}>$ 16.9</span>
            </div>
          </div>))}
        </div>
        <div className={styles.placeBetWrapper}>
          <button className={styles.placeBet}>Place bet $ 40</button>
        </div>
      </div>
    </div>
  );
};

export default Basket;