import styles from './Basket.module.css'
import clsx from "clsx";
import {Dispatch, SetStateAction} from "react";

const Basket = ({isBasketOpen, setIsBasketOpen}: {
  isBasketOpen: boolean,
  setIsBasketOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className={clsx(styles.basket, isBasketOpen && styles.open)}>
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
        {[0, 1, 2, 3].map(item => (<div key={item} className={styles.event}>
          <div className={styles.eventHead}>
            <img className={styles.flag} src="/sports/flag.png" alt=""/>
            Celta Vigo - Alaves
            <img className={styles.delete} src="/sports/garbage.svg" alt=""/>
          </div>
          <div className={styles.oddsWrapper}>
            {[0, 1].map(item => (<div key={item}>
              <div className={styles.oddsHeading}>Full time result <img src="" alt=""/></div>
              <div className={styles.odds}>
                {[0, 1, 2].map(item => (<div key={item} className={styles.odd}>
                  <div>1</div>
                  <span>1.69</span>
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
          <button className={styles.placeBet} onClick={() => setIsBasketOpen(false)}>Place bet $ 40</button>
        </div>
      </div>
    </div>
  );
};

export default Basket;