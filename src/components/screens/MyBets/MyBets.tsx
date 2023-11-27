"use client"

import styles from './MyBets.module.css'
import {useEffect, useState} from "react";
import clsx from "clsx";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useAccount} from "wagmi";
import {fetchMyBets} from "@/redux/subgraph/callFunctions";
import {clearMyBets} from "@/redux/features/azuroSlice";
import {DateRange, DayPicker} from "react-day-picker";
import {addDays} from "date-fns";
import Events from "@/components/screens/MyBets/Events";
import Filter, {byStatus} from "@/components/screens/MyBets/Filter";
import {formatAMPM} from "@/utils/formatAMPM";

const pastMonth = new Date(Date.now());

const returnBetsSorting = (sortItem: string, prevState: any) => {
  return {
    Type: sortItem === 'Type' ? !prevState.Type : prevState.Type,
    'Bet date': sortItem === 'Bet date' ? !prevState['Bet date'] : prevState['Bet date'],
    'Bet amount': sortItem === 'Bet amount' ? !prevState['Bet amount'] : prevState['Bet amount'],
    'Potential return': sortItem === 'Potential return' ? !prevState['Potential return'] : prevState['Potential return'],
    'Total odds': sortItem === 'Total odds' ? !prevState['Total odds'] : prevState['Total odds'],
    Results: sortItem === 'Results' ? !prevState.Results : prevState.Results,
    Status: sortItem === 'Status' ? !prevState.Status : prevState.Status
  }
}

const MyBets = () => {
  const [filterStatus, setFilterStatus] = useState('All')
  const [betsSorting, setBetsSorting] = useState({
    Type: false,
    'Bet date': false,
    'Bet amount': false,
    'Potential return': false,
    'Total odds': false,
    Results: false,
    Status: false
  })
  const [openedBet, setOpenedBet] = useState('')

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const myBets = useAppSelector(state => state.azuroSlice.myBets)
  const dispatch = useAppDispatch()
  const {address, isConnected} = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      dispatch(fetchMyBets({address, orderBy: 'createdBlockTimestamp', orderDirection: 'desc'}))
    }

    return () => {
      dispatch(clearMyBets())
    }
  }, [address])

  return (
    <div className={styles.wrapper}>
      <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
      <div className={styles.content}>
        <div className={styles.contentHeading}>
          <span>My Bets</span>
          {byStatus.map(item => (
            <div key={item} onClick={() => setFilterStatus(item)}
                 className={clsx(styles.filterItem, item === filterStatus && styles.activeFilter)}>{item}</div>
          ))}
        </div>
        <div className={styles.betsSorting}>
          {Object.keys(betsSorting).map((sortItem, index) => (
            <div key={sortItem} onClick={() => setBetsSorting(prevState => returnBetsSorting(sortItem, prevState))}
                 className={clsx(betsSorting[sortItem as keyof typeof betsSorting] && styles.sortDesc, styles['sort' + index])}>
              <span></span> {sortItem}</div>
          ))}
        </div>
        <div className={styles.myBets}>
          {myBets.map(bet => (
            <div key={bet.id} className={clsx(styles.betWrapper, openedBet === bet.id && "openBet")}>
              <div onClick={() => {
                setOpenedBet(prevState => prevState === bet.id ? '' : bet.id)
              }} className={styles.bet}>
                <div className={styles.type}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08Z"
                      fill="#616161"/>
                  </svg>
                  {bet.type}
                </div>
                <div className={styles.date}>{formatAMPM(new Date(Number(bet.createdAt || 0) * 1000))}</div>
                <div className={styles.amount}>{bet.amount} USDT</div>
                <div className={styles.potentialReturn}>{Number(bet.potentialPayout || 0).toFixed(2)} USDT</div>
                <div className={styles.odds}>{Number(bet.odds || 0).toFixed(2)}</div>
                <div className={styles.results}>{bet.result}</div>
                <div className={styles.status}>{bet.status}</div>
                <svg className={styles.arrow} width="12" height="8" viewBox="0 0 12 8" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#878787"/>
                </svg>
              </div>
              <Events bet={bet}/>
            </div>
          ))}
        </div>
      </div>
      <DayPicker
        // components={{}}
        id="test"
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        onSelect={setRange}
      />
    </div>
  );
};

export default MyBets;