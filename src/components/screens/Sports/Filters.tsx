"use client"

import styles from "@/components/screens/Sports/Filters.module.css";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {usePathname, useRouter} from "next/navigation";
import {ISortItem} from "@/redux/features/azuroInterface";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";
import {setIsFilterOpen, setSortItem} from "@/redux/features/azuroSlice";
import {filterAmount, leagueAmount, topEventAmount} from "@/utils/amount";
import Search from "@/components/ui/Search/Search";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const pathChange = (pathname: string, router: AppRouterInstance, leagueSlug: string, sportSlug: string) => {
  let urlLeagues = pathname.split(`/sports/${sportSlug}`).pop()?.replace('/', '')
  if (urlLeagues === undefined) return
  const index = urlLeagues?.indexOf(leagueSlug)
  if (index !== -1) {
    if (index === 0) {
      if (urlLeagues?.indexOf(leagueSlug + '%20') === -1) router.push(`/sports/${sportSlug}/${urlLeagues.replace(leagueSlug, '')}`)
      else router.push(`/sports/${sportSlug}/${urlLeagues.replace(leagueSlug + '%20', '')}`)
    } else router.push(`/sports/${sportSlug}/${urlLeagues.replace('%20' + leagueSlug, '')}`)
  } else if (urlLeagues.length) router.push(`/sports/${sportSlug}/${urlLeagues}%20${leagueSlug}`)
  else router.push(`/sports/${sportSlug}/${leagueSlug}`)
}

const Filters = () => {
  const [filterType, setFilterType] = useState<'classic' | 'tag'>('classic')
  const [isFilterShow, setIsFilterShow] = useState(false)
  const sports = useAppSelector(state => state.azuroSlice.sportFilter)
  const isFilterOpen = useAppSelector(state => state.azuroSlice.isFilterOpen)
  const sortItem = useAppSelector(state => state.azuroSlice.sortItem)
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  useEffect(() => {
    isFilterOpen ? setIsFilterShow(true) : setTimeout(() => {
      setIsFilterShow(false)
    }, 200)
  }, [isFilterOpen])

  if (!pathname.includes('/sports')) return null
  else return (
    <>
      <div className={clsx(styles.pageBg, isFilterOpen && styles.showPageBg)}></div>
      <div
        className={clsx(styles.filters, isFilterShow && styles.filterShow, isFilterOpen && styles.filterOpen, 'filters')}>
        <div className={styles.filtersHeading}>
          <div className={styles.filtersHeadingMobile}>
            <span onClick={() => dispatch(setIsFilterOpen(false))}>BACK</span>
          </div>
          <div>
            <div className={clsx(styles.filterType, filterType === 'tag' && styles.filterTypeActive)}
                 onClick={() => setFilterType('tag')}>Tag filter
            </div>
            <div className={clsx(styles.filterType, filterType === 'classic' && styles.filterTypeActive)}
                 onClick={() => setFilterType('classic')}>Classic filter
            </div>
          </div>
        </div>
        <Search/>
        <div className={clsx(styles.tagFilter, filterType === 'tag' && styles.chosenFilter)}>
          <div className={styles.tagTitle}>SPORTS</div>
          <div className={styles.tags}>
            <div className={clsx(styles.tag, pathname === '/sports' && styles.tagActive)}
                 onClick={() => router.push('/sports/')}>
              {sportsIcon[iconsIndex["top"]]}
              Top events
              <span>{topEventAmount(sports)}</span>
            </div>
            {sports.map(sport => (
              <div key={sport.name}
                   onClick={() => router.push(`/sports/${sport.slug}`)}
                   className={clsx(styles.tag, !!pathname.split('/').find(str => str === sport.slug) && styles.tagActive)}>
                {sportsIcon[iconsIndex[sport.slug as keyof typeof iconsIndex] || 0]}
                {sport.name}
                <span>{filterAmount(sport)}</span>
              </div>
            ))}
          </div>
          {sports.map(sport => !pathname.split('/').find(str => str === sport.slug) ? null : (
            <div key={0} className={styles.leagueTag}>
              <div className={styles.tagTitle}>LEAGUES</div>
              <div className={styles.tags}>
                {sport.countries.map(({leagues}) => leagues.map(league => !league.games.length ? null : (
                  <div key={league.name}
                       onClick={() => pathChange(pathname, router, league.slug, sport.slug)}
                       className={clsx(styles.tag,
                         pathname.split(`/sports/${sport.slug}/`).pop()?.split('%20').find(item => item === league.slug) && styles.tagActive)
                       }>
                    {league.name}
                    <span>{leagueAmount(league)}</span>
                  </div>
                )))}
              </div>
            </div>
          ))}
          <div className={styles.tagTitle}>BY STATUS</div>
          <div className={clsx(styles.tags, styles.byStatusTags)}>
            {['All', 'Today', 'Tomorrow', '1h', '3h', '6h'].map(item => (
              <div onClick={() => dispatch(setSortItem(item as ISortItem))} key={item}
                   className={clsx(styles.tag, item === sortItem && styles.tagActive)}>
                {item}
              </div>))}
          </div>
          <div className={styles.buttonsWrapper}>
            <button className={styles.clearFilter} onClick={() => router.push('/sports')}>Clear</button>
            <button className={clsx(styles.clearFilter, styles.closeFilter)}
                    onClick={() => dispatch(setIsFilterOpen(false))}></button>
            <button className={clsx(styles.clearFilter, styles.apply)}
                    onClick={() => dispatch(setIsFilterOpen(false))}>Apply
            </button>
          </div>
        </div>
        <div className={clsx(styles.classicFilter, filterType === 'classic' && styles.chosenFilter)}>
          <div className={styles.title}>SPORTS</div>
          <div onClick={() => router.push('/sports/')}
               className={clsx(styles.filter, pathname === '/sports' && styles.filterActive)}>{sportsIcon[iconsIndex["top"]]}Top
            events
            <span>{topEventAmount(sports)}</span>
          </div>
          {sports.map(sport => (
            <div className={styles.filterWrapper} key={sport.name}>
              <div onClick={() => router.push(`/sports/${sport.slug}`)}
                   className={clsx(styles.filter, !!pathname.split('/').find(str => str === sport.slug) && styles.filterActive)}>
                {sportsIcon[iconsIndex[sport.slug as keyof typeof iconsIndex] || 0]}
                {sport.name} <span>{filterAmount(sport)}</span>
              </div>
              {!!pathname.split('/').find(str => str === sport.slug) && <div className={styles.leagues}>
                <div onClick={() => router.push(`/sports/${sport.slug.toLowerCase()}`)}
                     className={clsx(styles.filter, pathname === `/sports/${sport.slug}` && styles.filterActive)}>All
                  <span>{filterAmount(sport)}</span>
                </div>
                <span/>
                {sport.countries.map(({leagues}) => leagues.map(league => !league.games.length ? null : (
                  <div key={league.slug}
                       onClick={() => pathChange(pathname, router, league.slug, sport.slug)}
                       className={clsx(styles.filter,
                         pathname.split(`/sports/${sport.slug}/`).pop()?.split('%20').find(item => item === league.slug) && styles.filterActive)}>
                    {league.name}
                    <span>{leagueAmount(league)}
                      <img src="/sports/checkmark.svg" alt=""/>
                  </span></div>
                )))
                }
              </div>
              }
            </div>
          ))}
          <button className={styles.clearFilter} onClick={() => dispatch(setIsFilterOpen(false))}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Filters;