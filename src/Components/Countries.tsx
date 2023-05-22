import { useQuery, gql } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

const GET_COUNTRIES = gql`
  query {
    countries(filter: { code: { ne: "A" } }) {
      name
      capital
      emoji
      continent {
        name
      }
    }
  }
`;
export default function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const { continentName } = useParams();
  const navigate = useNavigate();
  polyfillCountryFlagEmojis();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <p
        className="absolute top-10 left-20 font-bold cursor-pointer"
        onClick={() => navigate(-1)}
      >
        BACK
      </p>
      <p className=" mt-20 font-bold text-xl">Select your country :</p>
      <ul className="w-4/5 mt-10 pb-10 gap-10 flex flex-row flex-wrap items-center justify-center">
        {data &&
          data.countries
            .filter((el: any) => el.continent.name === continentName)
            .map((country: any) => (
              <NavLink to={`/${continentName}/${country.name}`}>
                <li className="w-64 h-44 flex flex-col items-center justify-center border-gray-600 border-[2px] rounded-lg transform transition duration-500 hover:scale-110 hover:font-bold">
                  <p>{country.emoji}</p>
                  <p className="text-center">{country.name}</p>
                </li>
              </NavLink>
            ))}
      </ul>
    </div>
  );
}
