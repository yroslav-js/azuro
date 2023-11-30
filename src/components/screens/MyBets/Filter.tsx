import styles from "@/components/screens/MyBets/FIlter.module.css";
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {fetchMyBets, IBetsFilter} from "@/redux/subgraph/callFunctions";
import {useAccount} from "wagmi";
import {clearMyBets} from "@/redux/features/azuroSlice";
import {IBetSorting} from "@/components/screens/MyBets/MyBetsFunctions";
import {DateRange, DayPicker} from "react-day-picker";

export const byStatus = ['All', 'Open', 'Claimed', 'Unclaimed', 'Pending', 'To claim']
export const byResults = ['All', 'Won', 'Lost', 'Soon']
export const byType = ['All', 'Combo', 'Ordinar']

const Filter = ({filterStatus, setFilterStatus, betsSorting, startsAt, startsTo, setRange, pastMonth, range}: {
  filterStatus: string
  setFilterStatus: Dispatch<SetStateAction<string>>
  betsSorting: IBetSorting
  startsAt?: Date | undefined
  startsTo?: Date | undefined
  pastMonth: Date
  setRange: Dispatch<SetStateAction<DateRange | undefined>>
  range: DateRange | undefined
}) => {
  const [filterType, setFilterType] = useState('All')
  const [filterResults, setFilterResults] = useState('All')
  const {address, isConnected} = useAccount()
  const dispatch = useAppDispatch()

  useEffect(() => {
    let promise: any
    if (address) {
      dispatch(clearMyBets())
      const filters: IBetsFilter = {actor_starts_with_nocase: address}
      let orderBy = 'createdBlockTimestamp'
      let orderDirection = 'desc'
      if (startsAt) {
        filters.createdBlockTimestamp_gt = (Number(startsAt) / 1000).toFixed(0)
        filters.createdBlockTimestamp_lt = startsTo ?
          (Number(startsTo) / 1000 + 24 * 3600).toFixed(0) :
          (Number(startsAt) / 1000 + 24 * 3600).toFixed(0)
      }
      if (filterType === 'Ordinar') filters.type = 'Ordinar'
      else if (filterType === 'Combo') filters.type = 'Express'
      if (filterResults === 'Won') filters.result = 'Won'
      else if (filterResults === 'Lost') filters.result = 'Lost'
      else if (filterResults === 'Soon') filters.result = null
      if (filterStatus === 'Open') filters.status = 'Accepted'
      else if (filterStatus === 'Claimed') filters.isRedeemed = true
      else if (filterStatus === 'Unclaimed') filters.status = ''
      else if (filterStatus === 'Pending') filters.status = 'Accepted'
      else if (filterStatus === 'To claim') {
        filters.isRedeemed = false
        filters.isRedeemable = true
      }
      if (betsSorting["Bet date"].chosen) {
        orderDirection = betsSorting["Bet date"].direction
      } else if (betsSorting["Bet amount"].chosen) {
        orderBy = 'amount'
        orderDirection = betsSorting["Bet amount"].direction
      } else if (betsSorting["Potential return"].chosen) {
        orderBy = 'potentialPayout'
        orderDirection = betsSorting["Potential return"].direction
      } else if (betsSorting["Total odds"].chosen) {
        orderBy = 'odds'
        orderDirection = betsSorting["Total odds"].direction
      }
      promise = dispatch(fetchMyBets({where: filters, orderBy, orderDirection}))
    }

    return () => {
      promise?.abort()
    }
  }, [filterType, address, filterResults, filterStatus, betsSorting, startsAt, startsTo])

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading}>Filter</div>
      <div className={styles.filterContent}>
        <div className={styles.by}>
          <div className={styles.byTitle}>BY TYPE</div>
          <div className={styles.byItems}>
            {byType.map(item => (
              <div className={clsx(styles.filterItem, item === filterType && styles.activeFilter)}
                   onClick={() => isConnected && setFilterType(item)} key={item}>{item}</div>
            ))}
          </div>
        </div>
        <div className={styles.by}>
          <div className={styles.byTitle}>BY STATUS</div>
          <div className={styles.byItems}>
            {byStatus.map(item => (
              <div onClick={() => isConnected && setFilterStatus(item)}
                   className={clsx(styles.filterItem, item === filterStatus && styles.activeFilter)}
                   key={item}>{item}</div>
            ))}
          </div>
        </div>
        <div className={styles.by}>
          <div className={styles.byTitle}>BY RESULTS</div>
          <div className={styles.byItems}>
            {byResults.map(item => (
              <div onClick={() => isConnected && setFilterResults(item)}
                   className={clsx(styles.filterItem, item === filterResults && styles.activeFilter)}
                   key={item}>{item}</div>
            ))}
          </div>
        </div>
        {(filterResults !== 'All' || filterStatus !== 'All' || filterType !== 'All') &&
          <div className={styles.clear} onClick={() => {
            setFilterStatus('All')
            setFilterType('All')
            setFilterResults('All')
          }}>Clear
          </div>
        }
      </div>
      <div className={styles.calendar}>
        <DayPicker
          // components={{}}
          id="test"
          mode="range"
          defaultMonth={pastMonth}
          selected={range}
          onSelect={setRange}
        />
        {!!range && <div className={styles.clearCalendar} onClick={() => setRange(undefined)}>
          Clear
        </div>}
      </div>
    </div>
  );
};

export default Filter;