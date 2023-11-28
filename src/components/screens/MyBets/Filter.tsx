import styles from "@/components/screens/MyBets/FIlter.module.css";
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {fetchMyBets, IBetsFilter} from "@/redux/subgraph/callFunctions";
import {useAccount} from "wagmi";
import {clearMyBets} from "@/redux/features/azuroSlice";
import {IBetSorting} from "@/components/screens/MyBets/MyBetsFunctions";

export const byStatus = ['All', 'Open', 'Claimed', 'Unclaimed', 'Pending', 'To claim']
export const byResults = ['All', 'Won', 'Lost', 'Soon']
export const byType = ['All', 'Combo', 'Ordinar']

const Filter = ({filterStatus, setFilterStatus, betsSorting}: {
  filterStatus: string,
  setFilterStatus: Dispatch<SetStateAction<string>>,
  betsSorting: IBetSorting
}) => {
  const [filterType, setFilterType] = useState('All')
  const [filterResults, setFilterResults] = useState('All')
  const {address, isConnected} = useAccount()
  const dispatch = useAppDispatch()

  useEffect(() => {
    let promise: any
    if (address) {
      const filters: IBetsFilter = {actor_starts_with_nocase: address}
      let orderBy = 'createdBlockTimestamp'
      let orderDirection = 'desc'
      if (filterType === 'Ordinar') filters.type = 'Ordinar'
      if (filterType === 'Combo') filters.type = 'Express'
      if (filterResults === 'Won') filters.result = 'Won'
      if (filterResults === 'Lost') filters.result = 'Lost'
      if (filterResults === 'Soon') filters.result = null
      if (filterStatus === 'Open') filters.status = 'Accepted'
      if (filterStatus === 'Claimed') filters.isRedeemed = true
      if (filterStatus === 'Unclaimed') filters.status = ''
      if (filterStatus === 'Pending') filters.status = 'Accepted'
      if (filterStatus === 'To claim') {
        filters.isRedeemed = false
        filters.isRedeemable = true
      }
      if (betsSorting["Bet date"].chosen) orderDirection = betsSorting["Bet date"].direction
      if (betsSorting["Bet amount"].chosen) {
        orderBy = 'amount'
        orderDirection = betsSorting["Bet amount"].direction
      }
      if (betsSorting["Potential return"].chosen) {
        orderBy = 'potentialPayout'
        orderDirection = betsSorting["Potential return"].direction
      }
      if (betsSorting["Total odds"].chosen) {
        orderBy = 'odds'
        orderDirection = betsSorting["Total odds"].direction
      }
      promise = dispatch(fetchMyBets({where: filters, orderBy, orderDirection}))
    }

    return () => {
      promise?.abort()
      dispatch(clearMyBets())
    }
  }, [filterType, address, filterResults, filterStatus, betsSorting])

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
      </div>
    </div>
  );
};

export default Filter;