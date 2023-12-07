"use client"

import styles from './Statistic.module.css'
import {useState} from "react";

const Statistic = () => {
  const [statistic, setStatistic] = useState('Latest activity')

  return (
    <div className={styles.statistic}>
      <div className={styles.selection}>
        {['Latest activity', 'Liquidity leaders', 'Newest event'].map(item => (
          <div key={item} className={statistic === item ? styles.active : ''}>{item}</div>
        ))}
        <div className={styles.titles}>
          <p>EVENT</p>
          <p>CREATOR</p>
          <p>LIQUIDITY</p>
          <p>ODD</p>
          <p>BET</p>
        </div>
        <div className={styles.values}>
          {Array.from(Array(10)).map(_ => (
            <div key={_}>
              <div className={styles.event}>SHOULD TRUMP GO TO JAIL IN 2024?</div>
              <div className={styles.creator}>User01322</div>
              <div className={styles.liquidity}>67m</div>
              <div className={styles.odd}>23</div>
              <div className={styles.bet}>300</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistic;