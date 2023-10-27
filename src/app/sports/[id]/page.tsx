import Event from "@/components/screens/Event/Event";

const Page = ({params}: { params: { id: string } }) => {
  return (
    <Event id={params.id}/>
  );
};

export default Page;