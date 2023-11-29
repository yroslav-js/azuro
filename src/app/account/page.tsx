import dynamic from "next/dynamic";

const Account = dynamic(() => import("@/components/screens/Account/Account"), {ssr: false})

const Page = () => <Account/>

export default Page;