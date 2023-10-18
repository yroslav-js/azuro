import styles from './Event.module.css'
import Filters from "@/components/screens/Sports/Filters";
import Basket from "@/components/screens/Sports/Basket";
import Link from "next/link";
import clsx from "clsx";

const Event = () => {
  return (
    <div className={styles.wrapper}>
      <Filters/>
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
              <img src="/sports/team.svg" alt=""/>
            </div>
            Lorem ipsum dolor sit amet 1
          </div>
          <div className={styles.time}>
            10:00 PM
            <span>Today 12:00</span>
          </div>
          <div className={styles.team}>
            <div className={styles.teamImg}>
              <img src="/sports/team.svg" alt=""/>
            </div>
            Lorem ipsum dolor sit amet 2
          </div>
        </div>
        <div className={styles.oddsWrapper}>
          {[0, 1].map(item => (<div key={item}>
            <div className={styles.oddsTitle}>
              <span>Full Time Result <img src="/sports/i.svg" alt=""/></span>
              <img src="/sports/arrowUpBlue.svg" alt=""/>
            </div>
            <div className={clsx(styles.odds, styles.oddsThree)}>
              {[0, 1, 2].map(item => (<div key={item} className={styles.odd}>
                1 <span>1.69</span>
              </div>))}
            </div>
          </div>))}
          <div>
            <div className={styles.oddsTitle}>
              <span>Both Teams To Score <img src="/sports/i.svg" alt=""/></span>
              <img src="/sports/arrowUpBlue.svg" alt=""/>
            </div>
            <div className={clsx(styles.odds, styles.oddsEven)}>
              {[0, 1].map(item => (<div key={item} className={styles.odd}>
                Yes <span>1.69</span>
              </div>))}
            </div>
          </div>
          {[0, 1, 2].map(item => (<div key={item}>
            <div className={styles.oddsTitle}>
              <span>Both Teams To Score <img src="/sports/i.svg" alt=""/></span>
              <img src="/sports/arrowUpBlue.svg" alt=""/>
            </div>
            <div className={clsx(styles.odds, styles.oddsEven)}>
              {[0, 1, 2, 3].map(item => (<div key={item} className={styles.odd}>
                Yes <span>1.69</span>
              </div>))}
            </div>
          </div>))}
          <div className={styles.oddsLast}>
            <div className={styles.oddsTitle}>
              <span>Total Goals <img src="/sports/i.svg" alt=""/></span>
              <img src="/sports/arrowUpBlue.svg" alt=""/>
            </div>
            <div className={styles.odds}>
              {[0, 1, 2, 3].map(item => (<div key={item} className={styles.odd}>
                Over <span>1.69</span>
              </div>))}
            </div>
          </div>
        </div>
      </div>
      <Basket/>
    </div>
  );
};

export default Event;