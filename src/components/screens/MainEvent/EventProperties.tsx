"use client"

import styles from './EventProperties.module.css'
import {useState} from "react";
import clsx from "clsx";
import Odd from "@/components/screens/MainEvent/Odd";

const EventProperties = () => {
  const [select, setSelect] = useState('Bets')
  const [filter, setFilter] = useState('')
  const [option, setOption] = useState<null | number>(null)
  return (
    <div className={styles.event}>
      <div className={styles.heading}><span>BACK</span> Who will win the presidential election (USA 2024)?</div>
      <div className={styles.anotherEvent}>
        <span></span>
        WHO WILL WIN THE PRESIDENTIAL ELECTION (USA 2024)?
        <span></span>
      </div>
      <div className={styles.actions}>
        <div>
          <div className={styles.status}>Active</div>
          <div className={styles.amount}>$67M</div>
        </div>
        <div>
          <div className={styles.profile}></div>
          <div className={styles.share}></div>
          <div className={styles.bookmark}></div>
          <div className={styles.rules}></div>
        </div>
        <div className={styles.hashtags}>#politics #elections</div>
        <div className={styles.selection}>
          {['Bets', 'Liquidity'].map(item => (
            <div className={item === select ? styles.active : ''} key={item}>{item}</div>
          ))}
        </div>
        <div className={styles.filter}>
          <div className={!filter ? styles.active : ''}>All odds</div>
          {Array.from(Array(5)).map(item => (
            <div key={item} className={filter === item ? styles.active : ''}>Top odds</div>
          ))}
        </div>
        {Array.from(Array(5)).map((item, index) => (
          <div className={clsx(styles.option, index === option && styles.open)} key={item}
               onClick={() => setOption(prevState => prevState === index ? null : index)}>
            <div className={styles.name}>D.Trump <span>
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.91 7.41L6.5 2.83L11.09 7.41L12.5 6L6.5 0L0.5 6L1.91 7.41Z" fill="#007AFF"/>
              </svg>
            </span></div>
            <div className={styles.content}>
              {Array.from(Array(50)).map(odd => (
                <div key={odd}>
                  <Odd/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventProperties;