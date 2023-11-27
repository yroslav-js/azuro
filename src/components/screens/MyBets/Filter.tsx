import styles from "@/components/screens/MyBets/FIlter.module.css";
import clsx from "clsx";
import {Dispatch, SetStateAction, useState} from "react";

export const byStatus = ['All', 'Open', 'Claimed', 'Unclaimed', 'Pending', 'To claim']
export const byResults = ['All', 'Won', 'Lost', 'Soon']
export const byType = ['All', 'Combo', 'Ordinar']

const Filter = ({filterStatus, setFilterStatus}: {
  filterStatus: string,
  setFilterStatus: Dispatch<SetStateAction<string>>
}) => {
  const [filterType, setFilterType] = useState('All')
  const [filterResults, setFilterResults] = useState('All')

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading}>Filter</div>
      <div className={styles.filterContent}>
        <div className={styles.by}>
          <div className={styles.byTitle}>BY TYPE</div>
          <div className={styles.byItems}>
            {byType.map(item => (
              <div className={clsx(styles.filterItem, item === filterType && styles.activeFilter)}
                   onClick={() => setFilterType(item)} key={item}>{item}</div>
            ))}
          </div>
        </div>
        <div className={styles.by}>
          <div className={styles.byTitle}>BY STATUS</div>
          <div className={styles.byItems}>
            {byStatus.map(item => (
              <div onClick={() => setFilterStatus(item)}
                   className={clsx(styles.filterItem, item === filterStatus && styles.activeFilter)}
                   key={item}>{item}</div>
            ))}
          </div>
        </div>
        <div className={styles.by}>
          <div className={styles.byTitle}>BY RESULTS</div>
          <div className={styles.byItems}>
            {byResults.map(item => (
              <div onClick={() => setFilterResults(item)}
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