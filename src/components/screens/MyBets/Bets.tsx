import styles from "./Bets.module.css";
import clsx from "clsx";
import {formatAMPM} from "@/utils/formatAMPM";
import ClaimButton from "@/components/screens/MyBets/ClaimButton";
import Events from "@/components/screens/MyBets/Events";
import {useState} from "react";
import {useAppSelector} from "@/hooks/reduxHooks";
import {getUKOdds} from "@/utils/getUKOdds";
// @ts-ignore
import odds from "odds-converter";

const sortRules = (a: string | null, b: string | null) => {
  if (a === null) return -1
  if (b === null) return 1
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

const Bets = ({filterStatus, betsSorting}: { filterStatus: string, betsSorting: [string, string] }) => {
  const [openedBet, setOpenedBet] = useState('')
  const myBets = useAppSelector(state => state.azuroSlice.myBets)
  const oddsFormat = useAppSelector(state => state.azuroSlice.oddsFormat)

  return (
    <div className={styles.myBets}>
      {myBets
        .filter(bet => {
          if (filterStatus === 'Pending') {
            return !!bet.selections.find(event => +event.outcome.condition.game.startsAt <= Date.now() / 1000)
          } else return true
        })
        .sort((a, b) => {
          if (betsSorting[0] === 'Type') {
            return betsSorting[1] === 'desc' ? sortRules(a.type, b.type) : sortRules(b.type, a.type)
          } else if (betsSorting[0] === 'Results') {
            return betsSorting[1] === 'desc' ? sortRules(a.result, b.result) : sortRules(b.result, a.result)
          } else if (betsSorting[0] === 'Status') {
            return betsSorting[1] === 'desc' ? sortRules(a.status, b.status) : sortRules(b.status, a.status)
          } else return 0
        })
        .map(bet => (
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
              <div className={clsx(styles.potentialReturn,
                bet.result === null && styles.PRblue,
                bet.isRedeemable === true && styles.PRgreen,
                bet.result === 'Lost' && styles.PRred)}>{Number(bet.potentialPayout || 0).toFixed(2)} USDT
              </div>
              <div className={styles.odds}>{
                oddsFormat === "EU" ? Number(bet.odds || 0).toFixed(2) :
                  oddsFormat === "UK" ? getUKOdds(Number(bet.odds || 0)) :
                    Number(odds.decimal.toAmerican(Number(bet.odds || 0))).toFixed(0)
              }</div>
              <div className={clsx(styles.results,
                bet.result === 'Won' && styles.resultGreen,
                bet.result === 'Lost' && styles.resultRed)}>{bet.status === 'Canceled' ? 'Canceled' : bet.result || 'Soon'}</div>
              <div className={styles.status}>
                <ClaimButton betId={bet.betId} isRedeemable={bet.isRedeemable} isRedeemed={bet.isRedeemed}
                             status={bet.status} type={bet.type}/>
              </div>
              <svg className={styles.arrow} width="12" height="8" viewBox="0 0 12 8" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#878787"/>
              </svg>
            </div>
            <Events bet={bet}/>
          </div>
        ))}
    </div>
  );
};

export default Bets;