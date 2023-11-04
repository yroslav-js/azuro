"use client"

import styles from './Basket.module.css'
import clsx from "clsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import {setBasketEvents} from "@/redux/features/azuroSlice";
import {useAccount, useContractWrite, useWaitForTransaction} from 'wagmi'
import {encodeAbiParameters, formatUnits, parseAbiParameters, parseUnits} from "viem";
import {IBasket} from "@/redux/features/azuroInterface";
import {CONTRACT_ADDRESS, USDT_ADDRESS} from "@/contract/config";
import abi from "@/contract/abi";
import {ethers} from "ethers";


const Basket = ({isBasketOpen = false, setIsBasketOpen = () => ({}), basket, setBasket}: {
  basket: IBasket[],
  setBasket: Dispatch<SetStateAction<IBasket[]>>,
  isBasketOpen?: boolean,
  setIsBasketOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const basketEvents = useAppSelector(state => state.azuroSlice.basket)
  const dispatch = useAppDispatch()
  const [firstRender, setFirstRender] = useState(true)
  const [amount, setAmount] = useState('0.01')
  const {address} = useAccount()

  // const data = basket.length > 1 ? encodeAbiParameters(
  //   parseAbiParameters('(uint256, uint64)[]'),
  //   [
  //     basket.map(conditions => {
  //       return [
  //         BigInt(conditions.conditionId),
  //         BigInt(conditions.outcomeId),
  //       ]
  //     }) as readonly (readonly [bigint, bigint])[],
  //   ]
  // ) : basket.length && encodeAbiParameters(
  //   parseAbiParameters('uint256, uint64'),
  //   [BigInt(basket[0]?.conditions[0]?.conditionId || ''),
  //     BigInt(basket[0]?.conditions[0]?.outcomes[0]?.outcomeId || ''),]
  // )

  const data1 = encodeAbiParameters(
    parseAbiParameters('uint256, uint64'),
    [BigInt(basket[0]?.conditions[0]?.conditionId || ''),
      BigInt(basket[0]?.conditions[0]?.outcomes[0]?.outcomeId || ''),]
  )
  const data2 = encodeAbiParameters(
    parseAbiParameters('uint256, uint64'),
    [BigInt(basket[1]?.conditions[0]?.conditionId || ''),
      BigInt(basket[1]?.conditions[0]?.outcomes[0]?.outcomeId || ''),]
  )


  console.log([
    basket.map(conditions => {
      return [
        BigInt(conditions.conditionId),
        BigInt(conditions.outcomeId),
      ]
    }) as readonly (readonly [bigint, bigint])[],
  ])

  // const data = encodeAbiParameters(
  //   parseAbiParameters('uint256, uint64'),
  //   [BigInt(basket[0]?.conditions[0]?.conditionId || ''),
  //     BigInt(basket[0]?.conditions[0]?.outcomes[0]?.outcomeId || ''),]
  // )

  const prematchCoreAddress = '0x8ea11e2aefab381e87b644e018ae1f78aa338851'
  const currentOdds = 1.5
  const slippage = 5
  const minOdds = 1 + (currentOdds - 1) * (100 - slippage) / 100
  const oddsDecimals = 12
  const rawMinOdds = parseUnits(minOdds.toFixed(oddsDecimals), oddsDecimals)
  // const USDT_DECIMALS = 6
  const POLYGON_DECIMALS = 18
  const affiliate = '0x0000000000000000000000000000000000000000'
  const lp = '0xe47F16bc95f4cF421f008BC5C23c1D3d5F402935'


  // console.log(lp,
  //   [
  //     {
  //       core: prematchCoreAddress,
  //       amount: "10000",
  //       expiresAt: BigInt(Math.floor(Date.now() / 1000) + 20000),
  //       extraData: {
  //         affiliate,
  //         minOdds: 0,
  //         data,
  //       }
  //     }
  //   ])

  const usdtAbi = [{
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  }, {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }]

  const {write: usdtWrite, data: usdtData} = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: usdtAbi,
    functionName: 'mint',
    args: [
      address,
      parseUnits(amount, 6)
    ],
  })

  const {isSuccess} = useWaitForTransaction({
    hash: usdtData?.hash,
  })

  const {write: approveWrite, data: approveData} = useContractWrite({
    address: USDT_ADDRESS,
    abi: usdtAbi,
    functionName: 'approve',
    args: [
      CONTRACT_ADDRESS,
      parseUnits(amount, 6).toString()
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
          amount: parseUnits(amount, 6).toString(),
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
      // '0x99a5116128821826E88f9c06B4c0d6454bb2Ded3'
      '0x0000000000000000000000000000000000000000'
    ],
  })

  useEffect(() => {
    isApproveSuccess && write()
  }, [isApproveSuccess])

  useEffect(() => {
    if (!firstRender) {
      localStorage && localStorage.setItem('basket', JSON.stringify(basket))
      localStorage && dispatch(setBasketEvents([...basket]))
    }
  }, [basket])

  useEffect(() => {
    if (setBasket && localStorage) setBasket([...JSON.parse(localStorage.getItem('basket') || '[]')])
    setFirstRender(false)
  }, []);

  return (
    <div className={clsx(styles.basket, isBasketOpen && styles.open)}>
      <div className={styles.closeModal} onClick={() => setIsBasketOpen(false)}></div>
      <div className={styles.basketHeading}>
        <div>Bet slip</div>
        {/*<div>My Bets</div>*/}
      </div>
      {/*<div className={styles.emptyBasket}>*/}
      {/*  <img src="" alt=""/>*/}
      {/*  <p>To add a bet to your betslip, choose a market and make your selection</p>*/}
      {/*  <button>How to play</button>*/}
      {/*</div>*/}
      <div className={styles.basketContent}>
        <div className={styles.betType}>
          <div className={styles.betTypeActive}>Ordinar</div>
          <div>Combo</div>
        </div>
        <div className={styles.selectionText}>Amount for each selection</div>
        <div className={styles.selection}>
          <div className={styles.selectionSelect}>
            <div>Amount</div>
            <div className={clsx(styles.activeSelection, styles.selectionLong)}>Distribute</div>
          </div>
          <div className={clsx(styles.selectionAmount, styles.activeSelectionAmount)}>10$</div>
          <div className={styles.selectionAmount}>25$</div>
          <div className={styles.selectionAmount}>50$</div>
          <div className={styles.selectionAmount}>100$</div>
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
                      if (index === indexItem) return {...event, outcomeId: odd.outcomeId}
                      return {...event}
                    })])
                  }
                  setBasket(prevState => [...prevState, {
                    id: item.id,
                    outcomeId: odd.outcomeId,
                    title: item.title,
                    conditions: item.conditions,
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
            <input type="number"/>
            <div>200$</div>
            <div>50$</div>
            <div>10%</div>
          </div>
        </div>))}
        <div className={styles.total}>
          <div className={styles.totalOddsText}><span>Total odds</span><span>6.76</span></div>
          <div className={styles.totalReturnText}><span>Total potential return</span><span className={styles.blue}>$ 67.7</span>
          </div>
          {[0, 1, 2, 3].map(item => (<div className={styles.totalEvents} key={item}>
            <img src="/sports/garbageGray.svg" alt=""/>
            <div className={styles.totalEvent}>
              <span className={styles.eventName}>1x </span>
              <span className={styles.eventOdds}>1.69</span>
              <span className={styles.eventTeam}>/ Celta Vigo - Alaves</span>
              <span className={styles.eventCost}>$ 16.9</span>
            </div>
          </div>))}
        </div>
        <div className={styles.placeBetWrapper}>
          <button className={styles.placeBet} onClick={() => {
            approveWrite()
          }}>Place bet $ 40
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;