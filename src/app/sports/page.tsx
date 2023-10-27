import dynamic from "next/dynamic";

const Sports = dynamic(() => import('@/components/screens/Sports/Sports'), {ssr: false})

const SportsPage = () => {
  return (
    <Sports/>
  );
};

export default SportsPage;