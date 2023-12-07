import styles from './ClaimButton.module.css'
import * as animationData from "@/components/screens/Sports/Gradient-background.json";
import Lottie from "react-lottie";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS, EXPRESS_BET_ADDRESS, ORDINAR_BET_ADDRESS} from "@/contract/config";
import abi from "@/contract/abi";

const ClaimButton = ({isRedeemable, isRedeemed, status, betId, type}: {
  isRedeemable: boolean, isRedeemed: boolean, status: string, betId: string, type: string
}) => {
  const {write} = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'withdrawPayouts',
    args: [
      [{core: type === 'Express' ? EXPRESS_BET_ADDRESS : ORDINAR_BET_ADDRESS, tokenId: betId, isNative: false}],
      '0x0000000000000000000000000000000000000000'
    ]
  })

  if (isRedeemed) return <button className={styles.claimed}>Claimed</button>
  if (isRedeemable && !isRedeemed) return (
    <button className={status === 'Canceled' ? styles.canceled : styles.claim} onClick={e => {
      e.stopPropagation()
      write()
    }}>
      <span>{status === 'Canceled' ? 'Refund' : 'To claim'}</span>
      {status !== 'Canceled' && <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          },
        }}
        isStopped={false}
        isPaused={false}/>}
    </button>
  )
  if (status === 'Accepted') return <button className={styles.open}>Open</button>
};

export default ClaimButton;