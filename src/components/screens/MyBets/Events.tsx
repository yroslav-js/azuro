import React from 'react';
import styles from "@/components/screens/MyBets/Events.module.css";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";
import {formatDate} from "@/utils/formatDate";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {IMyBets} from "@/redux/features/mybetsInterface";
import clsx from "clsx";

const Events = ({bet}: { bet: IMyBets }) => {
  return (
    <div className={styles.events}>
      {bet.selections.map(event => {
        const game = event.outcome.condition.game
        return <div key={event.id} className={styles.event}>
          <div className={styles.championship}>
            {sportsIcon[iconsIndex[game.sport.slug as keyof typeof iconsIndex] || 0]}
            <div>
              <div className={styles.eventTitle}>Championship</div>
              <div className={styles.eventValue}>{game.league.name}</div>
            </div>
          </div>
          <div className={styles.teamName}>
            <div className={styles.teamsImg}>
              <span>
              <img src={game.participants[0].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
              </span>

              <span>
              <img src={game.participants[1].image} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = "/sports/team.svg";
              }} alt=""/>
              </span>
            </div>
            <div className={styles.teams}>
              <div className={styles.eventDate}>{formatDate(+game.startsAt)}</div>
              <div className={styles.eventValue}>
                {game.participants[0].name + ' - ' + game.participants[0].name}
              </div>
            </div>
          </div>
          <div className={clsx(styles.eventMarket, styles.taCenter)}>
            <div className={styles.eventTitle}>Market</div>
            <div className={styles.eventValue}>{getMarketName({outcomeId: event.outcome.outcomeId})}</div>
          </div>
          <div className={clsx(styles.eventOdds, styles.taCenter)}>
            <div className={styles.eventTitle}>Odds</div>
            <div className={styles.eventValue}>{Number(event.odds).toFixed(2)}</div>
          </div>
          <div className={styles.eventIsWin}>
            {
              bet.status === 'Resolved' ? (
                bet.result === 'Won' ? (
                  <img src="/win.svg" alt=""/>
                ) : (
                  <img src="/lost.svg" alt=""/>
                )
              ) : null
            }
          </div>
          <div className={clsx(styles.eventOutcome, styles.taCenter)}>
            <div className={styles.eventTitle}>Outcome</div>
            <div className={styles.eventValue}>{getSelectionName({
              outcomeId: event.outcome.outcomeId,
              withPoint: true
            })}</div>
          </div>
        </div>
      })}
    </div>
  );
};

export default Events;