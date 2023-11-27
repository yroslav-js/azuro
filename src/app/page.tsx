"use client"

import Main from "@/components/screens/Main/Main";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/sports')
  }, [])

  return (
    <Main/>
  )
}
