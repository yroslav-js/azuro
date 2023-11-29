import styles from './ClaimButton.module.css'
import * as animationData from "@/components/screens/Sports/Gradient-background.json";
import Lottie from "react-lottie";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS} from "@/contract/config";
import abi from "@/contract/abi";

const ClaimButton = (
  {isRedeemable, isRedeemed, status, betId}: {
    isRedeemable: boolean,
    isRedeemed: boolean,
    status: string,
    betId: string
  }
) => {
  const core = '0x8ea11e2aefab381e87b644e018ae1f78aa338851'
  const {write} = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'withdrawPayouts',
    args: [
      [{core, tokenId: betId, isNative: false}],
      '0x0000000000000000000000000000000000000000'
    ]
  })

  if (isRedeemed) return <button className={styles.claimed}>Claimed</button>
  if (isRedeemable && !isRedeemed) return (
    <button className={styles.claim} onClick={e => {
      e.stopPropagation()
      write()
    }}>
      <span>To claim</span>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          },
        }}
        height={24}
        width={70}
        isStopped={false}
        isPaused={false}/>
    </button>
  )
  if (status === 'Accepted') return <button className={styles.open}>Open</button>
  if (status === 'Canceled') return <button className={styles.canceled}>Canceled</button>
};

export default ClaimButton;