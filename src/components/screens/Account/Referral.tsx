"use client"

import clsx from "clsx";
import "./CommonStyle.css"
import styles from './Referral.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {PieChart} from "react-minimal-pie-chart";

const colors = ['#007aff', '#34c759', '#878787', '#f57425', '#ed2939', '#7bbaff']

const Referral = () => {
  const [links, setLinks] = useState<{ name: string, link: string }[]>([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [segmentIndex, setSegmentIndex] = useState<null | number>(null)

  useEffect(() => {
    axios.get('http://localhost:3001/api/user/links', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(res => {
      if (res.data.data.links) setLinks(res.data.data.links)
    }).catch(() => {
    })
  }, [loading])

  return (
    <div className={styles.referral}>
      <div className={clsx(styles.referralLinks, "accountBlock")}>
        <p className="bigTitle">referral link management</p>
        <div className={styles.subtitle}>You can create several links to invite different groups of leads</div>
        <div className={styles.linksWrapper}>
          <div className="accountSmallBlock">
            <input type="text" placeholder="Input referral link name" value={value}
                   onChange={e => setValue(e.target.value)}/>
            <button className={styles.generate} onClick={() => {
              if (value) {
                setLinks(prevState => [...prevState, {name: value, link: Date.now().toString()}])
                setValue('')
              }
              // axios.post('http://localhost:3001/api/user/create/link', {name: value}, {
              //   headers: {
              //     "Authorization": `Bearer ${localStorage.getItem('jwt')}`
              //   }
              // }).then(() => {
              //   setValue('')
              //   setLoading(prevState => !prevState)
              // }).catch(() => {
              // })
            }}>Generate link
            </button>
          </div>
          {links.map((link, index) => (
            <div className={clsx("accountSmallBlock", styles.link)} key={index}>
              <div>
                <div className={styles.name}>{link.name}<img className={styles.changeLink} src="/setInput.svg" alt=""/></div>
                <span className={styles.path}>http://localhost:3000/ref/{link.link}<img className={styles.copy} src="/copy.svg" alt=""/></span>
              </div>
              <button>Share</button>
            </div>
          ))}
        </div>
      </div>
      <div className={clsx(styles.statisticBlock, "accountBlock")} onMouseLeave={() => {
        setSegmentIndex(null)
      }}>
        <p className="bigTitle">referral statistics</p>
        <div className={styles.statistic}>
          <div className={styles.statisticData}>
            {segmentIndex !== null && <>
              <div>{links.length ? Math.round(100 / links.length) : 0}%</div>
              <p>{links.length * 10} users
              </p>
              <span>{links[segmentIndex || 0]?.name}</span>
            </>
            }
          </div>
          <PieChart
            onMouseOver={(_, id) => setSegmentIndex(id)}
            data={links.map((_, index) => {
              const even = (index / colors.length) % 2 > 1 ? -1 : 0
              return {title: '', value: 10, color: colors[index % colors.length || 0 + even]}
            })}
          />
        </div>
        <div className="accountSmallBlock">
          <div className={styles.statisticContract}>
            <p className="smallTitle">Referral storage contract</p>
            <span className={styles.contract}>0xbc2820e235e546a232cbfsdfsdfdsf...</span>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};

export default Referral;