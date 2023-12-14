"use client"

import styles from './PublicEvent.module.css'
import {useEffect, useState} from "react";
import clsx from "clsx";
import {useContractWrite, useWaitForTransaction} from "wagmi";
import {BET_MANAGER_ADDRESS, ERC20_ADDRESS} from "@/polybetContract/config";
import erc20 from "@/polybetContract/erc20";
import abi from "@/polybetContract/abi";
import {ethers} from "ethers";
import {MINUTE, YEAR} from "@/utils/constants";
import {BetEventIpfsStruct, stringToKeccak256, topicKeccak256, uploadJsonToIpfs} from "@/polybetContract/functions";

const CreatePublicEvent = () => {
  const [liquidity, setLiquidity] = useState(false)
  const [name, setName] = useState('')
  const [rules, setRules] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState('')
  const [outcomes, setOutcomes] = useState([
    {outcome: '', odds: [{odd: '', liquidity: ''}]},
    {outcome: '', odds: [{odd: '', liquidity: ''}]}
  ])
  const [date, setDate] = useState('')

  const {write: approve, data: approveData} = useContractWrite({
    address: ERC20_ADDRESS,
    abi: erc20,
    functionName: 'approve',
    args: [BET_MANAGER_ADDRESS, 300000000],
  })

  const {isSuccess: isApproveSuccess} = useWaitForTransaction({
    hash: approveData?.hash,
  })

  const {write: createBetWrite} = useContractWrite({
    address: BET_MANAGER_ADDRESS,
    abi: abi,
    functionName: 'createBet'
  })

  useEffect(() => {
    const createBet = async () => {
      const jsonStruct: BetEventIpfsStruct = {
        topic: name,
        options: outcomes.map(item => item.outcome),
        salt: Date.now().toString(),
        tags: tags,
        descriptinAndRules: rules
      }
      const ipfsHash = await uploadJsonToIpfs(jsonStruct);
      createBetWrite({
        args: [{
          topicName: topicKeccak256(name, Date.now().toString()),
          referrer: ethers.ZeroAddress,
          votingStart: Number((Date.now() / 1000).toFixed(0)) + YEAR,
          round1Duration: MINUTE,
          round2Duration: MINUTE,
          disputeDuration: MINUTE,
          options: outcomes.map(item => stringToKeccak256(item.outcome)),
          ipfs: ipfsHash,
          bettingDeadline: Number((Date.now() / 1000).toFixed(0)) + YEAR,
          provideLiquidityOptions: outcomes.map(item => stringToKeccak256(item.outcome)),
          coeficients: [10001, 15000],
          liquiditiesAmount: [100000000, 100000000],
        }]
      } as any)
    }

    isApproveSuccess && createBet()
  }, [isApproveSuccess])

  return (
    <div className={clsx(styles.content, liquidity && styles.isLiquidity)}>
      <div className={styles.heading}><span>BACK</span>
        <div>
          <span>Create event</span>
          <span>Adding liquidity</span>
        </div>
      </div>
      <div className={styles.event}>
        <p>EVENT NAME</p>
        <input type="text" placeholder="Enter event name" value={name} onChange={e => setName(e.target.value)}/>
        <p>DESCRIPTION & RULES</p>
        <textarea placeholder="Describe event" value={rules} onChange={e => setRules(e.target.value)}/>
        <p>TAGS AND GROUPS</p>
        <span>Choose events`s group</span>
        <div className={styles.group}>
          <div className={styles.tags}>
            {tags.map((tagItem, index) => (
              <div className={styles.tag} key={index}>{tagItem}</div>
            ))}
          </div>
          {/*<div className={styles.lock}>*/}
          {/*  <span>Lock liquidity</span>*/}
          {/*  <div className={styles.toggle}></div>*/}
          {/*</div>*/}
        </div>
        <input type="text" placeholder="Add few tags" value={tag} onChange={e => setTag(e.target.value)}
               onKeyDown={e => {
                 if ((e.code === 'Space' || e.code === 'Enter') && tag.replaceAll(' ', '').length) {
                   setTags(prevState => [...prevState, tag])
                   setTag('')
                 }
               }}/>
        <p>ADD OUTCOMES</p>
        <div className={styles.outcomes}>
          {outcomes.map((outcomeItem, index) => (
            <input key={index} type="text" placeholder="Enter outcome" value={outcomeItem.outcome}
                   onChange={e => {
                     setOutcomes(prevState => prevState.map((item, id) => {
                       if (index === id) return {...item, outcome: e.target.value}
                       return {...item}
                     }))
                   }}/>
          ))}
          <div onClick={() => setOutcomes(prevState => [...prevState, {outcome: '', odds: [{liquidity: '', odd: ''}]}])}
               className={styles.plus}><span></span></div>
        </div>
        <div className={styles.timeAndLocation}>
          <div>
            <p>EXPIRY</p>
            <input type="date" value={date} onChange={e => {
              console.log(e)
              setDate(e.target.value)
            }} placeholder="Choose date and time"/>
          </div>
          <div>
            <p>LOCATION</p>
            <input type="date" placeholder="Choose location"/>
          </div>
        </div>
        <button onClick={() => setLiquidity(true)}>Continue</button>
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
        {outcomes.map((item, index) => (
          <div className={styles.createdEvent} key={index}>
            <div className={styles.title}>{item.outcome}</div>
            <div className={styles.open}>
              {item.odds.map((odd, id) => (
                <div className={styles.oddsInput} key={id}>
                  {!!odd.odd && <span>{odd.odd}</span>}
                  <input type="text" placeholder={odd.odd ? "Input liquidity" : "Input odd"}/>
                </div>
              ))}
              <div className={styles.plus}><span></span></div>
            </div>
          </div>
        ))}
        <div className={styles.checkbox}>
          <div>
            <input type="checkbox"/>
          </div>
          I understand and agree all risks connected with ... Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Accusantium ad, amet architecto est fuga illo in minus necessitatibus nesciunt non obcaecati
        </div>
        {/*<div className={styles.slide}>Slide to create event for $ 50,000</div>*/}
        <button onClick={() => approve()}>Create event
        </button>
      </div>
    </div>
  );
};

export default CreatePublicEvent;