"use client"

import clsx from "clsx";
import styles from "@/components/screens/Account/UserData.module.css";
import "./CommonStyle.css"
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";

const UserData = () => {
  const [userName, setUserName] = useState('Nick name')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File>()
  const [preview, setPreview] = useState<string | undefined>('')

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      e.target.value = ''
      return
    }
    setSelectedFile(e.target.files[0])
    e.target.value = ''
  }

  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/user/me', {
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem('jwt')}`
  //     }
  //   }).then(res => {
  //     if (res.data.username) setUserName(res.data.username)
  //   }).catch(() => {
  //   })
  // }, [loading])

  return (
    <div className={clsx(styles.userData, "accountBlock")}>
      <div className={styles.avatar}>
        <svg onClick={() => setSelectedFile(undefined)} width="16" height="18" viewBox="0 0 16 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
            fill="#E6E6EC"/>
        </svg>

        {selectedFile && <img src={preview} alt=""/>}
        <form>
          <label htmlFor="image_uploads">Change avatar</label>
          <input type="file" id="image_uploads" accept=".jpg, .png" onChange={onSelectFile}/>
        </form>
      </div>
      <div className={styles.instead}>Use avatar instead of wallet icon <input type="checkbox"/></div>
      <div className={clsx(styles.nickname, "accountSmallBlock")}>
        <p className="smallTitle">Nick name</p>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder={userName}/>
        <img src="/setInput.svg" alt="" onClick={() => {
          if (value) setUserName(value)
          setValue('')
        }}/>
        {/*<button onClick={() => {*/}
        {/*  axios.post('http://localhost:3001/api/user/change/username', {username: value}, {*/}
        {/*    headers: {*/}
        {/*      "Authorization": `Bearer ${localStorage.getItem('jwt')}`*/}
        {/*    }*/}
        {/*  }).then(() => {*/}
        {/*    setValue('')*/}
        {/*    setLoading(prevState => !prevState)*/}
        {/*  }).catch(() => {*/}
        {/*  })*/}
        {/*}}>button*/}
        {/* </button>*/}
      </div>
      <div className={clsx(styles.link, "accountSmallBlock")}><img src="/discord.svg" alt=""/>Linked
        <img src="/link.svg" alt=""/></div>
    </div>
  );
};

export default UserData;