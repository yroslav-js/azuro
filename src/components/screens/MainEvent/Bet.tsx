"use client"

import styles from './Bet.module.css'
import clsx from "clsx";

const Bet = () => {
  return (
    <div className={styles.basket}>
      <div className={styles.heading}>
        Bet slip <span>Clear all</span>
      </div>
      <div className={styles.anotherEvent}>
        <span></span>
        WHO WILL WIN THE PRESIDENTIAL ELECTION (USA 2024)?
        <span></span>
      </div>
      <div className={styles.chosenBet}>Your bet <span>J.Baiden</span></div>
      <div className={styles.oddsAndLiquidity}>Odds and liquidity</div>
      <div className={styles.eachSelection}>
        <p>Amount for each selection</p>
        <div>
          <div className={styles.selection}>
            <div className={styles.selectionSelect}>
              <input type="number" placeholder='Amount' value={''}
                     onChange={e => {
                     }}/>
              <div className={clsx(styles.activeSelection, styles.selectionLong)}>Distribute</div>
            </div>
            {['10', '25', '50', '100'].map(item => (
              <div key={item} onClick={() => {
              }}
                   className={clsx(styles.selectionAmount, '' === item && styles.activeSelectionAmount)}>
                {item}$
              </div>
            ))}
          </div>
        </div>
      </div>
      {Array.from(Array(5)).map(item => (
        <div key={item} className={styles.bet}>
          <div className={styles.odd}><span>22</span> $137K</div>
          <input type="number" placeholder='Amount'/>
          <div>200$</div>
          <div>50$</div>
          <div>10%</div>
          <span><img src="/sports/garbageGray.svg" alt=""/></span>
        </div>
      ))}
      <div className={styles.result}>
        <p>Number of bets <span>5</span></p>
        <p>Total potential return <span>$ 0</span></p>
      </div>
      <button>Place bet</button>
    </div>
  );
};

export default Bet;