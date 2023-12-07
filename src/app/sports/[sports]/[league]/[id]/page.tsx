import SportsEvent from "@/components/screens/SportsEvent/SportsEvent";

const Page = ({params}: { params: { id: string, sports: string, league: string } }) => {
  return <SportsEvent id={params.id} sports={params.sports} league={params.league}/>;
};

export default Page;