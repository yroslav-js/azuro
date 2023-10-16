import styles from './Basket.module.css'

const Basket = () => {
  return (
    <div className={styles.basket}>
      <div className={styles.basketHeading}>
        <div>Bet slip</div>
        <div>My Bets</div>
      </div>
      <div className={styles.basketContent}>
        <img src="" alt=""/>
        <p>To add a bet to your betslip, choose a market and make your selection</p>
        <button>How to play</button>
      </div>
    </div>
  );
};

export default Basket;