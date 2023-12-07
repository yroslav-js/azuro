"use client"

import styles from './MyBets.module.css'
import {useState} from "react";
import clsx from "clsx";
import {DateRange} from "react-day-picker";
import Filter, {byStatus} from "@/components/screens/MyBets/Filter";
import Bets from "@/components/screens/MyBets/Bets";
import BetsSorting from "@/components/screens/MyBets/BetsSorting";

const MyBets = () => {
  const pastMonth = new Date(Date.now());
  const [filterStatus, setFilterStatus] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [betsSorting, setBetsSorting] = useState<[string, string]>(['Bet date', 'desc'])
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className={clsx(styles.wrapper, isFilterOpen && 'filterOpen')}>
      <Filter startsAt={range?.from} startsTo={range?.to} filterStatus={filterStatus} range={range}
              setIsFilterOpen={setIsFilterOpen}
              setFilterStatus={setFilterStatus} betsSorting={betsSorting} setRange={setRange} pastMonth={pastMonth}/>
      <div className={styles.content}>
        <div className={styles.contentHeading}>
          <span>My Bets</span>
          {/*<div className={styles.claimAll}>Claim all</div>*/}
          {byStatus.map(item => (
            <div key={item} onClick={() => setFilterStatus(item)}
                 className={clsx(styles.filterItem, item === filterStatus && styles.activeFilter)}>{item}</div>
          ))}
          <div className={styles.openFilter} onClick={() => setIsFilterOpen(prevState => !prevState)}>
            FILTER
            <img src="/sports/openFilter.svg" alt=""/>
            {/*<span>{1}</span>*/}
          </div>
        </div>
        <BetsSorting setBetsSorting={setBetsSorting}/>
        <Bets betsSorting={betsSorting} filterStatus={filterStatus}/>
      </div>
      <div className={styles.calendar}>
        {/*<DayPicker*/}
        {/*  // components={{}}*/}
        {/*  id="test"*/}
        {/*  mode="range"*/}
        {/*  defaultMonth={pastMonth}*/}
        {/*  selected={range}*/}
        {/*  onSelect={setRange}*/}
        {/*/>*/}
        {/*{!!range && <div className={styles.clearCalendar} onClick={() => setRange(undefined)}>*/}
        {/*  Clear*/}
        {/*</div>}*/}
      </div>
    </div>
  );
};

export default MyBets;