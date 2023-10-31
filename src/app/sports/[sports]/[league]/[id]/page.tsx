import Event from "@/components/screens/Event/Event";

const Page = ({params}: { params: { id: string, sports: string, league: string } }) => {
  return <Event id={params.id} sports={params.sports} league={params.league}/>;
};

export default Page;