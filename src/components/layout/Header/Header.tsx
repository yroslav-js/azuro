import styles from './Header.module.css'
import Image from "next/image";
import clsx from "clsx";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={clsx(styles.logo, 'flexCenter')}>
        <img src="/logo.svg" alt=""/>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.portfolioWrap}>
          <Image src='/metamask.png' alt='' width={40} height={40}/>
          <div className={styles.portfolio}>
            <div>portfolio</div>
            <p><img src="/tether.svg" alt=""/> 4k</p>
          </div>
        </div>
        <div className={styles.events}>
          <div className={styles.event}>All events</div>
          <div>Private events</div>
        </div>
        <div className={styles.input}>
          <input type="text" className={styles.search} placeholder='Search'/>
        </div>
        <button className={clsx(styles.add, 'flexCenter')}>Add event</button>
        <button className={clsx(styles.notification, 'flexCenter')}><img src="/notification.svg" alt=""/></button>
        <img src="/discord.svg" alt="" className={styles.discord}/>
        <button className={clsx(styles.signout, 'flexCenter')}>Sign out <img src="/logout.svg" alt=""/></button>
      </div>
    </header>
  );
};

export default Header;