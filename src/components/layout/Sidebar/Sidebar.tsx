"use client"

import styles from './Sidebar.module.css'
import {usePathname, useRouter} from "next/navigation";
import clsx from "clsx";
import {menu} from "@/components/layout/Sidebar/menu";

const Sidebar = () => {
  const path = usePathname()
  const router = useRouter()

  return (
    <>
      <aside className={styles.sidebar}>
        {menu.map((item, id) => (
          <div onClick={() => router.push(`/${item.path}`)} key={id}
               className={item.path === path.split('/')[1] ? styles.active : ''}>
            {item.img}
            <p>{item.name}</p>
          </div>
        ))}
      </aside>
      <aside className={clsx(styles.sidebar, styles.mobileSidebar)}>
        {menu.map((item, id) => {
          if (id > 3) return null
          return (
            // <div key={id} className={item.path === path ? styles.active : ''}>
            <div onClick={() => router.push(`/${item.path}`)} key={id}
                 className={item.path === path ? styles.active : ''}>
              {item.img}
              <p>{item.name}</p>
            </div>
          )
        })}
        {/*<div style={{textAlign: 'right'}} onClick={() => {*/}
        {/*}}>*/}
        {/*  <img style={{width: '28px', height: '28px', marginRight: '5px'}} src="/sidebar/menu.svg" alt=""/>*/}
        {/*  <p style={{marginTop: 0}}>Menu</p>*/}
        {/*</div>*/}
      </aside>
    </>
  );
};

export default Sidebar;