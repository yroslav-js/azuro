"use client"

import Main from "@/components/screens/Main/Main";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Sports from "@/components/screens/Sports/Sports";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/sports')
  }, [])

  return null

  // return (
  //   <Main/>
  // )
}
