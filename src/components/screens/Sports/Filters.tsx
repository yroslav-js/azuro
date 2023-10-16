import styles from "@/components/screens/Sports/Filters.module.css";
import clsx from "clsx";

const Filters = () => {
  return (
    <div className={styles.filters}>
      <div className={styles.filtersHeading}>
        <div>
          <div className={styles.filterType}>Tag filter</div>
          <div className={clsx(styles.filterType, styles.filterTypeActive)}>Classic filter</div>
        </div>
      </div>
      <div className={styles.tagFilter}>
        <div className={styles.tagTitle}>SPORTS</div>
        <div className={styles.tags}>
          <div className={styles.tag}>
            <img src="/sports/ball-blue.svg" alt=""/>
            Top events
            <span>34</span>
          </div>
          <div className={styles.tag}>
            <img src="/sports/ball-blue.svg" alt=""/>
            Top events
            <span>34</span>
          </div>
          <div className={styles.tag}>
            <img src="/sports/ball-blue.svg" alt=""/>
            Top events
            <span>34</span>
          </div>
        </div>
      </div>
      <div className={styles.classicFilter}>
        <div className={styles.title}>SPORTS</div>
        <div className={clsx(styles.filter, styles.filterActive)}>Top events <span>39</span></div>
        <div className={styles.filter}><img src="/sports/ball-blue.svg" alt=""/> Football <span>39</span>
          <div className={styles.leagues}>
            <div className={styles.league}>All <span>59</span></div>
            <div className={styles.league}><img src="/sports/flag.png" alt=""/> Bundes Liga <span>59</span></div>
            <div className={styles.league}><img src="/sports/flag.png" alt=""/> La Liga <span>59</span></div>
          </div>
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
          <div key={item} className={styles.filter}><img src="/sports/ball-blue.svg" alt=""/> Basketball <span>39</span>
          </div>))}
      </div>
    </div>
  );
};

export default Filters;