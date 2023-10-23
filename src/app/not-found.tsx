import styles from './page.module.css'
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Image className={styles.image} src='/404.png' alt='' width={256} height={156}/>
      <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua
      </div>
      <Link href='/' className={styles.home}>Home</Link>
    </div>
  );
};

export default NotFound;