import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";

const GET_LOCATIONS = gql`
  query {
    continents {
      code
      name
    }
  }
`;
export default function Home() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <h1 className="mt-10 font-bold text-2xl">Welcome to the World Tour !</h1>
      <p className=" mt-20 font-bold text-xl">Select your continent :</p>
      <ul className="w-4/5 mt-10 gap-10 flex flex-row flex-wrap items-center justify-center">
        {data &&
          data.continents.map((continent: any) => (
            <NavLink to={`/${continent.name}`}>
              <li className="w-64 h-44 flex flex-col items-center justify-center border-gray-600 border-[2px] rounded-lg transform transition duration-500 hover:scale-110 hover:font-bold">
                {continent.name}
              </li>
            </NavLink>
          ))}
      </ul>
    </div>
  );
}
