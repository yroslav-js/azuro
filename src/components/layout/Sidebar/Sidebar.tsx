"use client"

import styles from './Sidebar.module.css'
import {usePathname, useRouter} from "next/navigation";
import clsx from "clsx";
import {menu} from "@/components/layout/Sidebar/menu";
import Link from "next/link";

const Sidebar = () => {
  const path = usePathname()

  return (
    <>
      <aside className={styles.sidebar}>
        {menu.map((item, id) => (
          <Link href={`/${item.path}`} key={id} className={
            item.path === path.split('/')[1] || (!item.path && path.split('/')[1] === 'main') ? styles.active : ''
          }>
            {item.img}
            <p>{item.name}</p>
          </Link>
        ))}
      </aside>
      <aside className={clsx(styles.sidebar, styles.mobileSidebar)}>
        {menu.map((item, id) => {
          if (id > 3) return null
          return (
            <Link href={`/${item.path}`} key={id}
                  className={item.path === path.split('/')[1] ? styles.active : ''}>
              {item.img}
              <p>{item.name}</p>
            </Link>
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