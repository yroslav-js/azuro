import styles from './Main.module.css'
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {fetchSports, sortTime} from "@/redux/subgraph/callFunctions";
import {useEffect, useState} from "react";

const filters = {
  by: 'BY STATUS',
  filterItem: [
    {
      name: 'All',
      sort: 'all'
    },
    {
      name: 'Today',
      sort: 'today'
    },
    {
      name: 'Tomorrow',
      sort: 'tomorrow'
    },
    {
      name: '1h',
      sort: '1h'
    },
    {
      name: '3h',
      sort: '3h'
    },
    {
      name: '6h',
      sort: '6h'
    },
  ]
}

const Main = () => {
  const sports = useAppSelector(state => state.azuroSlice.sports)
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState<keyof typeof sortTime>('all')
  const [loading, setLoading] = useState(false)

  console.log(sports)

  useEffect(() => {
    setLoading(false)
  }, [sports]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>Top Events</h2>
        {!loading && sports.map(sport => {
          if (!sport.games.length) return
          return (
            <div key={sport.name} className={styles.events}>
              <div className={styles.eventsHead}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.9995 25.5002C11.2703 25.5002 9.64535 25.1721 8.12451 24.5159C6.60368 23.8596 5.28076 22.969 4.15576 21.844C3.03076 20.719 2.14014 19.3961 1.48389 17.8752C0.827637 16.3544 0.499512 14.7294 0.499512 13.0002C0.499512 11.2711 0.827637 9.64608 1.48389 8.12524C2.14014 6.60441 3.03076 5.28149 4.15576 4.15649C5.28076 3.03149 6.60368 2.14087 8.12451 1.48462C9.64535 0.828369 11.2703 0.500244 12.9995 0.500244C14.7287 0.500244 16.3537 0.828369 17.8745 1.48462C19.3953 2.14087 20.7183 3.03149 21.8433 4.15649C22.9683 5.28149 23.8589 6.60441 24.5151 8.12524C25.1714 9.64608 25.4995 11.2711 25.4995 13.0002C25.4995 14.7294 25.1714 16.3544 24.5151 17.8752C23.8589 19.3961 22.9683 20.719 21.8433 21.844C20.7183 22.969 19.3953 23.8596 17.8745 24.5159C16.3537 25.1721 14.7287 25.5002 12.9995 25.5002ZM19.2495 9.87524L20.937 9.31274L21.437 7.62524C20.7703 6.62524 19.9683 5.76587 19.0308 5.04712C18.0933 4.32837 17.062 3.79191 15.937 3.43774L14.2495 4.62524V6.37524L19.2495 9.87524ZM6.74951 9.87524L11.7495 6.37524V4.62524L10.062 3.43774C8.93701 3.79191 7.90576 4.32837 6.96826 5.04712C6.03076 5.76587 5.22868 6.62524 4.56201 7.62524L5.06201 9.31274L6.74951 9.87524ZM5.43701 19.5002L6.87451 19.3752L7.81201 17.6877L5.99951 12.2502L4.24951 11.6252L2.99951 12.5627C2.99951 13.9169 3.18701 15.1513 3.56201 16.2659C3.93701 17.3805 4.56201 18.4586 5.43701 19.5002ZM12.9995 23.0002C13.5412 23.0002 14.0724 22.9586 14.5933 22.8752C15.1141 22.7919 15.6245 22.6669 16.1245 22.5002L16.9995 20.6252L16.187 19.2502H9.81201L8.99951 20.6252L9.87451 22.5002C10.3745 22.6669 10.8849 22.7919 11.4058 22.8752C11.9266 22.9586 12.4578 23.0002 12.9995 23.0002ZM10.187 16.7502H15.812L17.562 11.7502L12.9995 8.56274L8.49951 11.7502L10.187 16.7502ZM20.562 19.5002C21.437 18.4586 22.062 17.3805 22.437 16.2659C22.812 15.1513 22.9995 13.9169 22.9995 12.5627L21.7495 11.6877L19.9995 12.2502L18.187 17.6877L19.1245 19.3752L20.562 19.5002Z"
                    fill="#ffffff"/>
                </svg>
                <h3>{sport.name}</h3>
              </div>
              {sport.games.map((game, id) => {
                if (id > 3) return null
                return (
                  <div key={game.id} className={styles.event}>
                    <div className={styles.eventHead}>
                      {/*<div className={styles.date}>Today 23:00</div>*/}
                      <div className={styles.date}>00:00</div>
                      <div>
                        <div><img src="/share.svg" alt=""/></div>
                        <div><img src="/bookmark.svg" alt=""/></div>
                      </div>
                    </div>
                    <div className={styles.team}>
                      <h4>
                        <img src="/sports/flag.png" alt=""/>
                        {game.title}
                      </h4>
                      <div className={styles.more}>MORE MARKETS</div>
                    </div>
                    <div className={styles.odds}>
                      {game.conditions.slice(0).sort((a, b) => Number(b.outcomes[0].outcomeId) - Number(a.outcomes[0].outcomeId)).map(condition => (
                        <div key={condition.outcomes[0].outcomeId}>
                          <p>{getMarketName({outcomeId: condition.outcomes[0].outcomeId})}</p>
                          <div>
                            {condition.outcomes.map(outcome => (
                              <div key={outcome.outcomeId} className={styles.odd}>
                                <div className={styles.oddName}>{getSelectionName({outcomeId: outcome.outcomeId})}</div>
                                <div className={styles.oddNum}>{Number(outcome.currentOdds).toFixed(2)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className={styles.filters}>
        <div className={styles.filtersHead}>Filters</div>
        <div className={styles.filtersContent}>
          <div>
            <div className={styles.filterTitle}>Sports</div>
            <div className={styles.filterItems}>
              <div className={styles.active}><p>Top events</p></div>
              {sports.map((sport, id) => (
                  <div key={sport.name}><p>{sport.name}</p></div>
                )
              )}</div>
          </div>
          <div>
            <div className={styles.filterTitle}>By Status</div>
            <div className={styles.filterItems}>{filters.filterItem.map((item, id) => (
              <div onClick={() => {
                if (loading) return
                setLoading(true)
                setSort(item.sort as keyof typeof sortTime)
                dispatch(fetchSports(sortTime[`${item.sort as keyof typeof sortTime}`]
                ))
              }}
                   key={item.name} className={sort === item.sort ? styles.active : ''}>
                {/*{item.img.length ? <img src={item.img} alt=""/> : ''} */}
                <p>{item.name}</p></div>
            ))}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;