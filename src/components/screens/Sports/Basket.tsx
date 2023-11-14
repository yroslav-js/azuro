"use client"

import styles from './Basket.module.css'
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {setBasketEvents} from "@/redux/features/azuroSlice";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction
} from 'wagmi'
import {encodeAbiParameters, parseAbiParameters, parseUnits} from "viem";
import {IBasket} from "@/redux/features/azuroInterface";
import {CONTRACT_ADDRESS, USDT_ADDRESS} from "@/contract/config";
import abi from "@/contract/abi";
import tokenAbi from "@/contract/tokenAbi";
import Image from "next/image";
import {chains} from "@/components/layout/WagmiAppConfig";
import {ethers} from "ethers";

const Basket = ({isBasketOpen = false, setIsBasketOpen = () => ({}), basket, setBasket}: {
  basket: IBasket[],
  setBasket: Dispatch<SetStateAction<IBasket[]>>,
  isBasketOpen?: boolean,
  setIsBasketOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const basketEvents = useAppSelector(state => state.azuroSlice.basket)
  const isFilterOpen = useAppSelector(state => state.azuroSlice.isFilterOpen)
  const dispatch = useAppDispatch()
  const [firstRender, setFirstRender] = useState(true)
  const [amount, setAmount] = useState(new Map())
  const [amountForEach, setAmountForEach] = useState('0')
  const {connect, connectors} = useConnect()
  const {switchNetwork} = useSwitchNetwork()
  const {chain} = useNetwork()
  const {isConnected, address} = useAccount()
  const {data: balance} = useBalance({
    address,
    token: USDT_ADDRESS
  })

  useEffect(() => {
    if (chains[0].id !== chain?.id) {
      switchNetwork?.(chains[0].id)
    }
  }, [])

  // const currentOdds = 1.5
  // const slippage = 5
  // const minOdds = 1 + (currentOdds - 1) * (100 - slippage) / 100
  // const oddsDecimals = 12
  // const rawMinOdds = parseUnits(minOdds.toFixed(oddsDecimals), oddsDecimals)
  const prematchCoreAddress = '0x8ea11e2aefab381e87b644e018ae1f78aa338851'
  const TOKEN_DECIMALS = 6
  const affiliate = '0x0000000000000000000000000000000000000000'
  const lp = '0xe47F16bc95f4cF421f008BC5C23c1D3d5F402935'
  const referrer = '0x0000000000000000000000000000000000000000'
  // '0x99a5116128821826E88f9c06B4c0d6454bb2Ded3'

  const sumOfMap = () => {
    let sum = 0
    amount.forEach(v => {
      sum += +v
    })

    return sum
  }

  const a = ethers.utils.defaultAbiCoder.encode(
    [
      "tuple(uint256 conditionId, uint64 outcomeId)[]",
      "uint64"
    ],
    [
      basket.map(({conditionId, outcomeId}) => {
        return [
          BigInt(conditionId),
          BigInt(outcomeId),
        ]
      }),
      '12000000000000'
    ]
  )

  const data = encodeAbiParameters(
    parseAbiParameters('(uint256, uint64)[]'),
    [
      basket.map(({conditionId, outcomeId}) => {
        return [
          BigInt(conditionId),
          BigInt(outcomeId),
        ]
      }) as readonly (readonly [bigint, bigint])[],
    ]
  )

  const {write: approveWrite, data: approveData} = useContractWrite({
    address: USDT_ADDRESS,
    abi: tokenAbi,
    functionName: 'approve',
    args: [
      CONTRACT_ADDRESS,
      parseUnits(+amountForEach ? (+amountForEach * basket.length).toString() : sumOfMap().toString(), TOKEN_DECIMALS).toString()
      // parseUnits('0.1', TOKEN_DECIMALS).toString()
    ],
  })

  const {isSuccess: isApproveSuccess} = useWaitForTransaction({
    hash: approveData?.hash,
  })

  const {write} = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'bet',
    args: [
      lp,
      basket.map(item => {
        return {
          core: prematchCoreAddress,
          amount: parseUnits(+amountForEach ? amountForEach : amount.get(item.id) || '0', TOKEN_DECIMALS).toString(),
          expiresAt: BigInt(Math.floor(Date.now() / 1000) + 20000),
          extraData: {
            affiliate,
            minOdds: 0,
            data: encodeAbiParameters(
              parseAbiParameters('uint256, uint64'),
              [BigInt(item.conditionId), BigInt(item.outcomeId)]
            ),
          }
        }
      }),
      referrer
    ],
  })

  // const {write} = useContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: abi,
  //   functionName: 'bet',
  //   args: [
  //     lp,
  //     [{
  //       core: prematchCoreAddress,
  //       amount: parseUnits('0.1' || '0', TOKEN_DECIMALS).toString(),
  //       expiresAt: BigInt(Math.floor(Date.now() / 1000) + 2000),
  //       extraData: {
  //         affiliate,
  //         minOdds: 0,
  //         data: a,
  //       }
  //     }],
  //     referrer
  //   ],
  // })

  useEffect(() => {
    isApproveSuccess && write()
  }, [isApproveSuccess])

  useEffect(() => {
    setAmount(map => new Map(...basket.map(item => {
      return map.set(item.id, map.has(item.id) ? map.get(item.id) : '0')
    })))
    if (!firstRender) {
      localStorage && localStorage.setItem('basket', JSON.stringify(basket))
      localStorage && dispatch(setBasketEvents([...basket]))
    }
  }, [basket])

  useEffect(() => {
    if (setBasket && localStorage) {
      const events: IBasket[] = JSON.parse(localStorage.getItem('basket') || '[]')
      setBasket([...events])
    }
    setFirstRender(false)
  }, []);

  return (
    <div className={clsx(styles.basket, isBasketOpen && styles.open, isFilterOpen && styles.zeroOpacity)}>
      <div className={styles.closeModal} onClick={() => setIsBasketOpen(false)}></div>
      <div className={styles.basketHeading}>
        <div className={styles.betSlip}>Bet slip</div>
        <div className={styles.betType}>
          <div>Combo</div>
          <div className={styles.betTypeActive}>Ordinar</div>
        </div>
        <div className={styles.clearAll} onClick={() => setBasket([])}>
          <img src="/sports/basketClearAll.svg" alt=""/> Clear all
        </div>
      </div>
      {!basket.length && <div className={styles.emptyBasket}>
        <Image width={90} height={90} src="/sports/manual.png" alt=""/>
        <p>To add a bet to your betslip, choose a market and make your selection</p>
        <button>How to play</button>
      </div>}
      {!!basket.length && <div className={styles.basketContent}>
        <div className={styles.selectionText}>Amount for each selection</div>
        <div className={styles.selection}>
          <div className={styles.selectionSelect}>
            <input type="number" placeholder='Amount' value={amountForEach}
                   onChange={e => setAmountForEach(Math.abs(+e.target.value).toString())}/>
            <div className={clsx(styles.activeSelection, styles.selectionLong)}>Distribute</div>
          </div>
          {['10', '25', '50', '100'].map(item => (
            <div key={item} onClick={() => setAmountForEach(amountForEach === item ? '0' : item)}
                 className={clsx(styles.selectionAmount, amountForEach === item && styles.activeSelectionAmount)}>
              {item}$
            </div>
          ))}
        </div>
        {!!basket?.length && basketEvents.map(item => (<div key={item.id} className={styles.event}>
          <div className={styles.eventHead}>
            <img className={styles.flag} src="/sports/flag.png" alt=""/>
            {item.title}
            <img className={styles.delete}
                 onClick={() => {
                   return setBasket((prevState) => [...prevState.filter((basketItem) => basketItem.id !== item.id)])
                 }}
                 src="/sports/garbage.svg" alt=""/>
          </div>
          <div className={styles.oddsWrapper}>
            {item.conditions?.map(outcome => (<div key={outcome.outcomes[0].outcomeId}>
              <div className={styles.oddsHeading}>{getMarketName({outcomeId: outcome.outcomes[0].outcomeId})}</div>
              <div className={styles.odds}>
                {outcome.outcomes.map(odd => (<div onClick={() => {
                  const indexItem = basket.findIndex((indexItem) => indexItem.id === item.id)
                  if (indexItem !== -1) {
                    if (basket[indexItem]?.outcomeId === odd.outcomeId)
                      return setBasket((prevState) => [...prevState.filter((_, index: number) => index !== indexItem)])
                    return setBasket((prevState) => [...prevState.map((event, index: number) => {
                      if (index === indexItem) return {
                        id: item.id,
                        outcomeId: odd.outcomeId,
                        title: item.title,
                        conditions: item.conditions,
                        currentOdds: odd.currentOdds,
                        conditionId: outcome.conditionId
                      }
                      return {...event}
                    })])
                  }
                  setBasket(prevState => [...prevState, {
                    id: item.id,
                    outcomeId: odd.outcomeId,
                    title: item.title,
                    conditions: item.conditions,
                    currentOdds: odd.currentOdds,
                    conditionId: outcome.conditionId
                  }])
                }} key={odd.outcomeId} className={clsx(styles.odd,
                  item.outcomeId === odd.outcomeId && styles.activeOdd)}>
                  <div>{getSelectionName({outcomeId: odd.outcomeId, withPoint: false})}</div>
                  <span>{Number(odd.currentOdds).toFixed(2)}</span>
                </div>))}
              </div>
            </div>))}
          </div>
          <div className={styles.amount}>
            <input type="number" value={+amountForEach || amount.get(item.id)} onChange={(e) => {
              setAmount(map => new Map(map.set(item.id, Math.abs(+e.target.value).toString())))
            }}/>
            {['200', '50'].map(value => (
              <div onClick={() => {
                if (amount.get(item.id) === value) {
                  return setAmount(map => new Map(map.set(item.id, 0)))
                }
                setAmount(map => new Map(map.set(item.id, value)))
              }} key={value}
                   className={amount.get(item.id) === value ? styles.activeAmount : ''}>{value}$</div>
            ))}
            <div className={amount.get(item.id) === Number(balance?.formatted) / 10 + '' ? styles.activeAmount : ''}
                 onClick={() => {
                   if (amount.get(item.id) === Number(balance?.formatted) / 10 + '') {
                     return setAmount(map => new Map(map.set(item.id, 0)))
                   }
                   setAmount(map => new Map(map.set(item.id, Number(balance?.formatted) / 10 + '')))
                 }}>10%
            </div>
          </div>
        </div>))}
        <div className={styles.total}>
          <div className={styles.totalOddsText}>
            <span>Total odds</span>
            <span>
              {basket.reduce((a, n) => +a * +n.currentOdds, 1).toFixed(2)}
            </span>
          </div>
          <div className={styles.totalReturnText}><span>Total potential return</span>
            <span
              className={styles.blue}>$ {((+amountForEach * basket.length || sumOfMap()) * basket.reduce((a, n) => +a * +n.currentOdds, 1)).toFixed(2)}</span>
          </div>
          {/*{[0, 1, 2, 3].map(item => (<div className={styles.totalEvents} key={item}>*/}
          {/*  <img src="/sports/garbageGray.svg" alt=""/>*/}
          {/*  <div className={styles.totalEvent}>*/}
          {/*    <span className={styles.eventName}>1x </span>*/}
          {/*    <span className={styles.eventOdds}>1.69</span>*/}
          {/*    <span className={styles.eventTeam}>/ Celta Vigo - Alaves</span>*/}
          {/*    <span className={styles.eventCost}>$ 16.9</span>*/}
          {/*  </div>*/}
          {/*</div>))}*/}
        </div>
        <div className={styles.placeBetWrapper}>
          <button className={styles.placeBet} onClick={() => {
            if (isConnected && chain?.id === chains[0].id) {
              approveWrite()
            } else connect({connector: connectors[0]})
          }}>Place bet $ 40
          </button>
        </div>
      </div>}
    </div>
  );
};

export default Basket;