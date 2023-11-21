"use client"

import styles from "@/components/layout/Header/Header.module.css";
import {useAccount, useContractRead} from "wagmi";
import {USDT_ADDRESS} from "@/contract/config";
import {formatUnits} from "viem";

const Balance = () => {
  const {isConnected, address} = useAccount()
  const {data} = useContractRead({
    address: USDT_ADDRESS,
    abi: [{
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view", "type": "function"
    }],
    functionName: 'balanceOf',
    args: [address || '0x0000000000000000000000000000000000000000']
  })

  return isConnected ? <div className={styles.portfolio}>
    <div>balance</div>
    <p><img src="/tether.svg" alt=""/> {formatUnits(data as bigint || BigInt(0), 6)}</p>
  </div> : null
};

export default Balance;