"use client"

import styles from './Sidebar.module.css'
import {usePathname} from "next/navigation";

const menu = [
  {
    name: 'Main',
    img: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM11.75 22.9125C6.8125 22.3 3 18.1 3 13C3 12.225 3.1 11.4875 3.2625 10.7625L9.25 16.75V18C9.25 19.375 10.375 20.5 11.75 20.5V22.9125ZM18 18C19.125 18 20.05 18.725 20.375 19.7375C22 17.9625 23 15.6 23 13C23 8.8125 20.4125 5.225 16.75 3.7375V4.25C16.75 5.625 15.625 6.75 14.25 6.75H11.75V9.25C11.75 9.9375 11.1875 10.5 10.5 10.5H8V13H15.5C16.1875 13 16.75 13.5625 16.75 14.25V18H18Z"
            fill="#878787"/>
    </svg>,
    path: '/'
  },
  {
    name: 'Games',
    img: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.375 19.5C6.89583 19.5 7.33854 19.3177 7.70312 18.9531C8.06771 18.5885 8.25 18.1458 8.25 17.625C8.25 17.1042 8.06771 16.6615 7.70312 16.2969C7.33854 15.9323 6.89583 15.75 6.375 15.75C5.85417 15.75 5.41146 15.9323 5.04688 16.2969C4.68229 16.6615 4.5 17.1042 4.5 17.625C4.5 18.1458 4.68229 18.5885 5.04688 18.9531C5.41146 19.3177 5.85417 19.5 6.375 19.5ZM6.375 8.25C6.89583 8.25 7.33854 8.06771 7.70312 7.70312C8.06771 7.33854 8.25 6.89583 8.25 6.375C8.25 5.85417 8.06771 5.41146 7.70312 5.04688C7.33854 4.68229 6.89583 4.5 6.375 4.5C5.85417 4.5 5.41146 4.68229 5.04688 5.04688C4.68229 5.41146 4.5 5.85417 4.5 6.375C4.5 6.89583 4.68229 7.33854 5.04688 7.70312C5.41146 8.06771 5.85417 8.25 6.375 8.25ZM12 13.875C12.5208 13.875 12.9635 13.6927 13.3281 13.3281C13.6927 12.9635 13.875 12.5208 13.875 12C13.875 11.4792 13.6927 11.0365 13.3281 10.6719C12.9635 10.3073 12.5208 10.125 12 10.125C11.4792 10.125 11.0365 10.3073 10.6719 10.6719C10.3073 11.0365 10.125 11.4792 10.125 12C10.125 12.5208 10.3073 12.9635 10.6719 13.3281C11.0365 13.6927 11.4792 13.875 12 13.875ZM17.625 19.5C18.1458 19.5 18.5885 19.3177 18.9531 18.9531C19.3177 18.5885 19.5 18.1458 19.5 17.625C19.5 17.1042 19.3177 16.6615 18.9531 16.2969C18.5885 15.9323 18.1458 15.75 17.625 15.75C17.1042 15.75 16.6615 15.9323 16.2969 16.2969C15.9323 16.6615 15.75 17.1042 15.75 17.625C15.75 18.1458 15.9323 18.5885 16.2969 18.9531C16.6615 19.3177 17.1042 19.5 17.625 19.5ZM17.625 8.25C18.1458 8.25 18.5885 8.06771 18.9531 7.70312C19.3177 7.33854 19.5 6.89583 19.5 6.375C19.5 5.85417 19.3177 5.41146 18.9531 5.04688C18.5885 4.68229 18.1458 4.5 17.625 4.5C17.1042 4.5 16.6615 4.68229 16.2969 5.04688C15.9323 5.41146 15.75 5.85417 15.75 6.375C15.75 6.89583 15.9323 7.33854 16.2969 7.70312C16.6615 8.06771 17.1042 8.25 17.625 8.25ZM3.25 23.25C2.5625 23.25 1.97396 23.0052 1.48438 22.5156C0.994792 22.026 0.75 21.4375 0.75 20.75V3.25C0.75 2.5625 0.994792 1.97396 1.48438 1.48438C1.97396 0.994792 2.5625 0.75 3.25 0.75H20.75C21.4375 0.75 22.026 0.994792 22.5156 1.48438C23.0052 1.97396 23.25 2.5625 23.25 3.25V20.75C23.25 21.4375 23.0052 22.026 22.5156 22.5156C22.026 23.0052 21.4375 23.25 20.75 23.25H3.25ZM3.25 20.75H20.75V3.25H3.25V20.75Z"
        fill="#878787"/>
    </svg>
    ,
    path: '/games'
  },
  {
    name: 'Sports',
    img: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.9995 25.5002C11.2703 25.5002 9.64535 25.1721 8.12451 24.5159C6.60368 23.8596 5.28076 22.969 4.15576 21.844C3.03076 20.719 2.14014 19.3961 1.48389 17.8752C0.827637 16.3544 0.499512 14.7294 0.499512 13.0002C0.499512 11.2711 0.827637 9.64608 1.48389 8.12524C2.14014 6.60441 3.03076 5.28149 4.15576 4.15649C5.28076 3.03149 6.60368 2.14087 8.12451 1.48462C9.64535 0.828369 11.2703 0.500244 12.9995 0.500244C14.7287 0.500244 16.3537 0.828369 17.8745 1.48462C19.3953 2.14087 20.7183 3.03149 21.8433 4.15649C22.9683 5.28149 23.8589 6.60441 24.5151 8.12524C25.1714 9.64608 25.4995 11.2711 25.4995 13.0002C25.4995 14.7294 25.1714 16.3544 24.5151 17.8752C23.8589 19.3961 22.9683 20.719 21.8433 21.844C20.7183 22.969 19.3953 23.8596 17.8745 24.5159C16.3537 25.1721 14.7287 25.5002 12.9995 25.5002ZM19.2495 9.87524L20.937 9.31274L21.437 7.62524C20.7703 6.62524 19.9683 5.76587 19.0308 5.04712C18.0933 4.32837 17.062 3.79191 15.937 3.43774L14.2495 4.62524V6.37524L19.2495 9.87524ZM6.74951 9.87524L11.7495 6.37524V4.62524L10.062 3.43774C8.93701 3.79191 7.90576 4.32837 6.96826 5.04712C6.03076 5.76587 5.22868 6.62524 4.56201 7.62524L5.06201 9.31274L6.74951 9.87524ZM5.43701 19.5002L6.87451 19.3752L7.81201 17.6877L5.99951 12.2502L4.24951 11.6252L2.99951 12.5627C2.99951 13.9169 3.18701 15.1513 3.56201 16.2659C3.93701 17.3805 4.56201 18.4586 5.43701 19.5002ZM12.9995 23.0002C13.5412 23.0002 14.0724 22.9586 14.5933 22.8752C15.1141 22.7919 15.6245 22.6669 16.1245 22.5002L16.9995 20.6252L16.187 19.2502H9.81201L8.99951 20.6252L9.87451 22.5002C10.3745 22.6669 10.8849 22.7919 11.4058 22.8752C11.9266 22.9586 12.4578 23.0002 12.9995 23.0002ZM10.187 16.7502H15.812L17.562 11.7502L12.9995 8.56274L8.49951 11.7502L10.187 16.7502ZM20.562 19.5002C21.437 18.4586 22.062 17.3805 22.437 16.2659C22.812 15.1513 22.9995 13.9169 22.9995 12.5627L21.7495 11.6877L19.9995 12.2502L18.187 17.6877L19.1245 19.3752L20.562 19.5002Z"
        fill="#878787"/>
    </svg>,
    path: '/sports'
  },
  {
    name: 'My events',
    img: <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M17 0.5V3H7V0.5H4.5V3H3.25C1.8625 3 0.7625 4.125 0.7625 5.5L0.75 23C0.75 24.375 1.8625 25.5 3.25 25.5H20.75C22.125 25.5 23.25 24.375 23.25 23V5.5C23.25 4.125 22.125 3 20.75 3H19.5V0.5H17ZM18.25 14.25H12V20.5H18.25V14.25ZM3.25 23H20.75V9.25H3.25V23Z"
            fill="#878787"/>
    </svg>,
    path: '/events'
  },
  {
    name: 'Voting',
    img: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M15.8066 13.6989H22.1296C22.9024 13.6989 23.5347 14.3312 23.5347 15.104V22.1296C23.5347 22.516 23.3801 22.8672 23.1202 23.1202L18.4974 27.75L17.7526 27.0123C17.563 26.8226 17.4435 26.5557 17.4435 26.2676L17.4646 26.0428L18.132 22.8321H13.6989C12.9261 22.8321 12.2938 22.1998 12.2938 21.427V20.0219C12.2938 19.8392 12.3289 19.6706 12.3922 19.509L14.5139 14.556C14.7246 14.0502 15.2234 13.6989 15.8066 13.6989ZM27.75 13.6989H24.9398V22.1296H27.75V13.6989Z"
            fill="#878787"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9.86798 5.16788H14.3011C15.0739 5.16788 15.7062 5.80018 15.7062 6.57299V7.9781C15.7062 8.16077 15.6711 8.32938 15.6078 8.49097L13.4861 13.444C13.2754 13.9498 12.7766 14.3011 12.1934 14.3011H5.87044C5.09763 14.3011 4.46533 13.6688 4.46533 12.896V5.87044C4.46533 5.48403 4.61989 5.13276 4.87984 4.87984L9.50265 0.25L10.2474 0.987682C10.437 1.17737 10.5565 1.44434 10.5565 1.73239L10.5354 1.95721L9.86798 5.16788ZM3.06022 5.87044H0.25V14.3011H3.06022V5.87044Z"
            fill="#878787"/>
    </svg>
    ,
    path: '/voting'
  },
  {
    name: 'Lorem',
    img: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14.5" stroke="#878787"/>
    </svg>
    ,
    path: '/lorem'
  },
  {
    name: 'Lorem',
    img: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14.5" stroke="#878787"/>
    </svg>
    ,
    path: '/lorem'
  },
  {
    name: 'Lorem',
    img: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14.5" stroke="#878787"/>
    </svg>
    ,
    path: '/lorem'
  },
  {
    name: 'Lorem',
    img: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14.5" stroke="#878787"/>
    </svg>
    ,
    path: '/lorem'
  },
  {
    name: 'Lorem',
    img: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="14.5" stroke="#878787"/>
    </svg>
    ,
    path: '/lorem'
  },
]

const Sidebar = () => {
  const path = usePathname()

  return (
    <aside className={styles.sidebar}>
      {menu.map((item, id) => (
        // <div key={id} className={item.path === path ? styles.active : ''}>
        <div key={id} className={item.path === '/sports' ? styles.active : ''}>
          {item.img}
          <p>{item.name}</p>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;