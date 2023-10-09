"use client"

import {ReactNode} from "react";
import Layout from "@/components/layout/Layout/Layout";
import {Provider} from "react-redux";
import {store} from "@/redux/store";

function LayoutProvider({children}: { children: ReactNode }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

export function Providers({children}: { children: ReactNode }) {
  return <Provider store={store}>
    <LayoutProvider>
      {children}
    </LayoutProvider>
  </Provider>;
}