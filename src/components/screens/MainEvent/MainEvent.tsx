"use client"

import styles from './MainEvent.module.css'
import Statistic from "@/components/screens/MainEvent/Statistic";
import EventProperties from "@/components/screens/MainEvent/EventProperties";
import Bet from "@/components/screens/MainEvent/Bet";

const MainEvent = () => {
  return (
    <div className={styles.content}>
      <Statistic/>
      <EventProperties/>
      <Bet/>
    </div>
  );
};

export default MainEvent;