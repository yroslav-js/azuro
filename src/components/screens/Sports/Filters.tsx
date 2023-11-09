"use client"

import styles from "@/components/screens/Sports/Filters.module.css";
import clsx from "clsx";
import {Dispatch, SetStateAction, useState} from "react";
import {useAppSelector} from "@/hooks/reduxHooks";
import {usePathname, useRouter} from "next/navigation";
import {IFilter, IFilterLeagues} from "@/redux/features/azuroInterface";
import {iconsIndex, sportsIcon} from "@/utils/sports-icon";

const topEventAmount = (sports: IFilter[]) => {
  let amount = 0
  sports.map(sport => sport.countries.map(game => game.leagues.map(league => {
    amount += league.games.length
  })))
  return amount
}

const filterAmount = (sport: IFilter) => {
  let amount = 0
  sport.countries.map(game => game.leagues.map(league => {
    amount += league.games.length
  }))
  return amount
}

const leagueAmount = (league: IFilterLeagues) => {
  let amount = 0
  amount += league.games.length
  return amount
}

const Filters = (
  {
    isFilterOpen = false, setIsFilterOpen = () => {
  }
  }: {
    isFilterOpen?: boolean,
    setIsFilterOpen?: Dispatch<SetStateAction<boolean>>
  }) => {
  const [filterType, setFilterType] = useState<'classic' | 'tag'>('classic')
  const sports = useAppSelector(state => state.azuroSlice.sportFilter)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={clsx(styles.filters, isFilterOpen && styles.filterOpen)}>
      <div className={styles.filtersHeading}>
        <div className={styles.filtersHeadingMobile}>
          <span onClick={() => setIsFilterOpen(false)}>BACK</span>
          <div>Filter</div>
          <img src="/discord.svg" alt=""/>
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
      <div className={clsx(styles.tagFilter, filterType === 'tag' && styles.chosenFilter)}>
        <div className={styles.input}>
          <input type="text" className={styles.search} placeholder='Search'/>
        </div>
        <div className={styles.tagTitle}>SPORTS</div>
        <div className={styles.tags}>
          <div className={clsx(styles.tag, pathname === '/sports' && styles.tagActive)}>
            {sportsIcon[iconsIndex["top"]]}
            Top events
            <span>{topEventAmount(sports)}</span>
          </div>
          {sports.map(sport => (
            <div key={sport.name}
                 className={clsx(styles.tag, sport.slug === pathname.split('/sports/').pop() && styles.tagActive)}>
              {sportsIcon[iconsIndex[sport.slug as keyof typeof iconsIndex] || 0]}
              {sport.name}
              <span>{filterAmount(sport)}</span>
            </div>
          ))}
        </div>
        {sports.map(sport => sport.slug !== pathname.split('/sports/').pop() ? null : (
          <div key={0} className={styles.leagueTag}>
            <div className={styles.tagTitle}>LEAGUES</div>
            <div className={styles.tags}>
              {sport.countries.map(({leagues}) => leagues.map(league => !league.games.length ? null : (
                <div key={league.name}
                     onClick={() => router.push(`/sports/${sport.slug}/${league.slug}`)}
                     className={clsx(styles.tag, league.name === pathname.split('/sports/').pop() && styles.tagActive)}>
                  <img src="/sports/ball-blue.svg" alt=""/>
                  {league.name}
                  <span>{leagueAmount(league)}</span>
                </div>
              )))}
            </div>
          </div>
        ))}
        <div className={styles.tagTitle}>BY STATUS</div>
        <div className={clsx(styles.tags, styles.byStatusTags)}>
          {['All', 'Today', 'Tomorrow', '1h', '3h', '6h'].map(item => (<div key={item} className={styles.tag}>
            {item}
          </div>))}
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.clearFilter}>Clear</button>
          <button className={clsx(styles.clearFilter, styles.closeFilter)}
                  onClick={() => setIsFilterOpen(false)}></button>
          <button className={clsx(styles.clearFilter, styles.apply)} onClick={() => setIsFilterOpen(false)}>Apply
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
                     onClick={() => {
                       let urlLeagues = pathname.split(`/sports/${sport.slug}`).pop()?.replace('/', '')
                       if (urlLeagues === undefined) return
                       const index = urlLeagues?.indexOf(league.slug)
                       console.log(urlLeagues, index)
                       if (index !== -1) {
                         if (index === 0) {
                           if (urlLeagues?.indexOf(league.slug + '%20') === -1) router.push(`/sports/${sport.slug}/${urlLeagues.replace(league.slug, '')}`)
                           else router.push(`/sports/${sport.slug}/${urlLeagues.replace(league.slug + '%20', '')}`)
                         } else router.push(`/sports/${sport.slug}/${urlLeagues.replace('%20' + league.slug, '')}`)
                       } else if (urlLeagues.length) router.push(`/sports/${sport.slug}/${urlLeagues}%20${league.slug}`)
                       else router.push(`/sports/${sport.slug}/${league.slug}`)
                     }}
                     className={clsx(styles.filter,
                       pathname.split(`/sports/${sport.slug}/`).pop() === league.slug && styles.filterActive)}>
                  {league.name}
                  <span>{leagueAmount(league)}
                    {pathname.split(`/sports/${sport.slug}/`).pop() === league.slug &&
                      <img src="/sports/checkmark.svg" alt=""/>}
                  </span></div>
              )))
              }
            </div>
            }
          </div>
        ))}
        <button className={styles.clearFilter} onClick={() => setIsFilterOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default Filters;