"use client"

import styles from './PublicEvent.module.css'

const CreatePublicEvent = () => {
  return (
    <div className={styles.content}>
      <div className={styles.heading}><span>BACK</span>
        <div>
          <span>Create event</span>
          <span>Adding liquidity</span>
        </div>
      </div>
      <div className={styles.event}>
        <p>EVENT NAME</p>
        <input type="text"/>
        <p>DESCRIPTION & RULES</p>
        <input type="text"/>
        <p>TAGS AND GROUPS</p>
        <span>Choose events`s group</span>
        <div className={styles.group}>
          <div className={styles.tag}>sport</div>
          <div className={styles.tag}>politics</div>
          <div className={styles.tag}>science</div>
          <div className={styles.lock}>
            <span>Lock liquidity</span>
            <div className={styles.toggle}></div>
          </div>
          <input type="text"/>
          <p>ADD OUTCOMES</p>
          <div className={styles.outcomes}>
            <input type="text"/>
            <input type="text"/>
            <div>+</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p>EXPIRY</p>
              <input type="date"/>
            </div>
            <div>
              <p>LOCATION</p>
              <input type="date"/>
            </div>
          </div>
          <button>Continue</button>
        </div>
        <div className={styles.liquidity}>
          <div className={styles.name}>
            Who will win the presidential election (USA 2024)?
          </div>
          <div className={styles.subName}>
            <div className={styles.date}>Nov 05, 2023</div>
            <div className={styles.amount}>$50K</div>
            <div className={styles.rules}>Rules</div>
          </div>
          <div className={styles.hashtag}>#politics #elections</div>
          <div className={styles.createdEvent}>
            <div className={styles.title}>J.Baiden</div>
            <div className={styles.open}>
              <input type="text"/>
              <div>+</div>
            </div>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox"/>
            I understand and agree all risks connected with ... Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Accusantium ad, amet architecto est fuga illo in minus necessitatibus nesciunt non obcaecati officia
            pariatur provident quis quos ratione, unde ut voluptatem.
          </div>
          <div className={styles.slide}>Slide to create event for $ 50,000</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePublicEvent;