import Header from "@/components/layout/Header/Header";
import {ReactNode} from "react";
import Footer from "@/components/layout/Footer/Footer";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import styles from './Layout.module.css'
import Filters from "@/components/screens/Sports/Filters";

const Layout = ({children}: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.mainContent}>
        <Sidebar/>
        <Filters/>
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;