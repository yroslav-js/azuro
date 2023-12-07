import styles from "@/components/screens/MyBets/MyBets.module.css";
import clsx from "clsx";
import {Dispatch, SetStateAction, useState} from "react";

const betSortingItems = ['Type', 'Bet date', 'Bet amount', 'Potential return', 'Total odds', 'Results', 'Status']

const BetsSorting = ({setBetsSorting}: {
  setBetsSorting: Dispatch<SetStateAction<[string, string]>>
}) => {
  const [state, setState] = useState<[string, string]>(['Bet date', 'desc'])
  return (
    <div className={styles.betsSorting}>
      {betSortingItems.map((sortItem, index) => (
        <div key={sortItem} onClick={() => setBetsSorting(prevState => {
          if (prevState[0] === sortItem) {
            setState([sortItem, prevState[1] === 'asc' ? 'desc' : 'asc'])
            return [sortItem, prevState[1] === 'asc' ? 'desc' : 'asc']
          }
          setState([sortItem, 'desc'])
          return [sortItem, 'desc']
        })}
             className={
               clsx(state[1] === 'desc' && state[0] === sortItem && styles.sortDesc,
                 styles['sort' + index])
             }>
          <span></span> {sortItem}</div>
      ))}
    </div>
  );
};

export default BetsSorting;