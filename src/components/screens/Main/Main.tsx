import styles from './Main.module.css'
import filtersStyles from "@/components/ui/Filters/Filters.module.css"
import {useState} from "react";
import Link from "next/link";

const filter = [
  {
    filterTitle: 'TOPICS',
    items: [
      {
        item: '#gaming',
        slug: 'gaming'
      },
      {
        item: '#technique',
        slug: 'technique'
      },
      {
        item: '#trump',
        slug: 'trump'
      },
      {
        item: '#sport',
        slug: 'sport'
      },
      {
        item: '#politics',
        slug: 'politics'
      },
      {
        item: '#science',
        slug: 'science'
      },
      {
        item: '#economy',
        slug: 'economy'
      },
      {
        item: '#CS',
        slug: 'CS'
      },
      {
        item: '#zelensky',
        slug: 'zelensky'
      },
      {
        item: '#war',
        slug: 'war'
      },
      {
        item: '#musk',
        slug: 'musk'
      },
      {
        item: '#space',
        slug: 'space'
      },
      {
        item: '#cryptocurrency',
        slug: 'cryptocurrency'
      },
      {
        item: '#spacex',
        slug: 'spacex'
      },
      {
        item: '#BTC',
        slug: 'BTC'
      },
    ]
  },
  {
    filterTitle: 'BY VALUE',
    items: [
      {
        item: 'new',
        slug: 'new'
      },
      {
        item: 'top of the day',
        slug: 'top-of-the-day'
      },
      {
        item: 'top of the week',
        slug: 'top-of-the-week'
      },
      {
        item: 'top liquidity',
        slug: 'top-liquidity'
      },
      {
        item: 'top activity',
        slug: 'top-activity'
      },
      {
        item: 'period',
        slug: 'period'
      },
    ]
  },
  {
    filterTitle: 'BY COEFFICIENT',
    items: [
      {
        item: '1 to 1',
        slug: '1 to 1'
      },
      {
        item: 'variable coefficient',
        slug: 'variable-coefficient'
      },
      {
        item: 'line',
        slug: 'line'
      },
    ]
  },
  {
    filterTitle: 'BY STATUS',
    items: [
      {
        item: 'active',
        slug: 'active'
      },
      {
        item: 'finishing soon',
        slug: 'finishing-soon'
      },
      {
        item: 'voting',
        slug: 'voting'
      },
      {
        item: 'finished',
        slug: 'finished'
      },
    ]
  },
]

const Main = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {['Top of the Day', 'Top of the week', '#Politics'].map(events => (
          <div key={events}>
            <div className={styles.title}>{events} <Link href='/'>MORE
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#007AFF"/>
              </svg>
            </Link></div>
            <div className={styles.events}>
              {[1, 2, 3, 4, 5, 6, 7].map(event => (
                <div className={styles.event} key={event}>
                  <div className={styles.eventHead}>
                    <div className={styles.eventTitle}>
                      should trump go to jail in 2024?
                    </div>
                    <div>
                      <div><img src="/share.svg" alt=""/></div>
                      <div><img src="/bookmark.svg" alt=""/></div>
                    </div>
                  </div>
                  <div className={styles.properties}>
                    <div className={styles.active}>Active</div>
                    <div className={styles.costs}>$67M</div>
                    <div className={styles.user}>User01322</div>
                  </div>
                  <div className={styles.tags}>#politics #trump #USA</div>
                  <div className={styles.buttons}>
                    <button>Add liquidity</button>
                    <button>Bet place</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {['Top of the Day', 'Top of the week', '#Politics'].map(events => (
          <div key={events}>
            <div className={styles.title}>{events}</div>
            <div className={styles.events}>
              {[1, 2, 3, 4, 5, 6, 7].map(event => (
                <div className={styles.event} key={event}>
                  <div className={styles.eventHead}>
                    <div className={styles.eventTitle}>
                      should trump go to jail in 2024?
                    </div>
                    <div>
                      <div><img src="/share.svg" alt=""/></div>
                      <div><img src="/bookmark.svg" alt=""/></div>
                    </div>
                  </div>
                  <div className={styles.properties}>
                    <div className={styles.active}>Active</div>
                    <div className={styles.costs}>$67M</div>
                    <div className={styles.user}>User01322</div>
                  </div>
                  <div className={styles.tags}>#politics #trump #USA</div>
                  <div className={styles.buttons}>
                    <button>Add liquidity</button>
                    <button>Bet place</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={filtersStyles.filters} style={{maxWidth: '300px', width: '300px', minWidth: '300px'}}>
        <div className={filtersStyles.filtersHead}>Filters</div>
        <div className={filtersStyles.filtersContent}>
          {filter.map((filter => (
            <div key={filter.filterTitle}>
              <div className={filtersStyles.filterTitle}>{filter.filterTitle}</div>
              <div className={filtersStyles.filterItems}>{filter.items.map(({item}, id) => (
                <div key={item} className={!id ? filtersStyles.active : ''}>
                  <p>{item}</p></div>
              ))}</div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default Main;