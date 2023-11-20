import styles from "./Search.module.css";
import clsx from "clsx";
import Link from "next/link";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {clearSearch} from "@/redux/features/azuroSlice";
import {fetchSearch} from "@/redux/subgraph/callFunctions";
import {usePathname} from "next/navigation";
import {IRecentlyEvent} from "@/redux/features/azuroInterface";
import {getMarketName} from "@azuro-org/dictionaries";

const Search = () => {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const search = useAppSelector(state => state.azuroSlice.search)
  const [searchType, setSearchType] = useState('ALL')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const [recently, setRecently] = useState<IRecentlyEvent[]>([])

  useEffect(() => {
    dispatch(clearSearch())
    let promise: any
    const timeout = setTimeout(() => {
      if (value) {
        promise = dispatch(fetchSearch({
          str: value,
          by: searchType === 'ALL' ? 'title' : 'turnover',
          direction: orderDirection
        }))
      }
    }, 1000)

    return () => {
      promise?.abort()
      clearTimeout(timeout)
    }
  }, [value, searchType, orderDirection]);

  useEffect(() => {
    setRecently(JSON.parse(localStorage.getItem('recently') || '[]'))
  }, [pathname]);

  return (
    <div className={clsx(styles.input, "searchInput")}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder='Search'
             onBlur={() => setFocus(false)}
             className={clsx(styles.search, (focus || isShown) && styles.focus)} onFocus={() => setFocus(true)}/>
      {!!value && <>
        <svg className={styles.clear} onClick={() => setValue('')} width="16" height="18" viewBox="0 0 16 18"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
            fill="#373737"/>
        </svg>
        <div className={styles.resultsWrapper}>
          <div className={styles.results}>
            <div className={styles.searchHeading}>
              {['ALL', 'TOP RATED'].map(str => (
                <span key={str} onClick={() => setSearchType(str)}
                      className={clsx(str === searchType && styles.active)}>{str}</span>
              ))}
            </div>
            <div className={styles.searchSort}>
              <div className={styles.amountResults}>RESULTS: <span>{search.length}</span></div>
              <div className={clsx(styles.sort, orderDirection === "desc" && styles.desc)}
                   onClick={() => setOrderDirection(prevState => prevState === "asc" ? "desc" : "asc")}>
                SORT
                <span></span>
              </div>
            </div>
            {!!search.length && search.map((event, index) => (
              <Link style={index % 2 ? {backgroundColor: 'rgba(225, 225, 229, 1)'} : {}}
                    href={`/sports/${event.sport.slug}/${event.league.slug}/${event.id}`} key={event.id}
                    className={styles.result}>
                {sportsIcon[iconsIndex[event.sport.slug as keyof typeof iconsIndex] || 0]}
                <div className={styles.resultText}>
                  <div className={styles.searchTitle}>{event.title}</div>
                  <div
                    className={styles.searchOdd}>{getMarketName({outcomeId: event.conditions[0].outcomes[0].outcomeId})}</div>
                  <div className={styles.searchLeague}>{event.league.name}</div>
                </div>
              </Link>
            ))}
          </div>
          {!search.length && <div className={styles.empty}>
            <Image width={90} height={90} src="/sports/noEvents.png" alt=""/>
            <div>
              We couldn't find any events matching your query. Try another query.
            </div>
          </div>}
        </div>
      </>
      }
      {!value && !!recently.length && (focus || isShown) &&
        <div className={styles.resultsWrapper} onMouseEnter={() => setIsShown(true)}
             onMouseLeave={() => setIsShown(false)}>
          <div className={styles.results}>
            {recently.map((event, index) => (
              <Link style={index % 2 ? {backgroundColor: 'rgba(225, 225, 229, 1)'} : {}}
                    href={`/sports/${event.sport.slug}/${event.league.slug}/${event.id}`} key={event.id}
                    className={styles.result} onClick={() => setIsShown(false)}>
                {sportsIcon[iconsIndex[event.sport.slug as keyof typeof iconsIndex] || 0]}
                <div className={styles.resultText}>
                  <div className={styles.searchTitle}>{event.title}</div>
                  <div className={styles.searchOdd}>{getMarketName({outcomeId: event.condition})}</div>
                  <div className={styles.searchLeague}>{event.league.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>}
    </div>
  );
};

export default Search;