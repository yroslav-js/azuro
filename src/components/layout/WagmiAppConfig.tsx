"use client"

import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {ReactNode} from "react";
import {MetaMaskConnector} from "@wagmi/connectors/metaMask";
import {polygonMumbai} from "viem/chains";
import {publicProvider} from "wagmi/providers/public";

export const chains = [polygonMumbai]

const {publicClient} = configureChains(chains, [publicProvider()])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({chains}),
  ],
  publicClient
})

export function WagmiAppConfig({children}: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
    </>
  );
}