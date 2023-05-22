import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

const GET_COUNTRY = gql`
  query {
    countries(filter: { code: { ne: "A" } }) {
      name
      emoji
      currency
      capital
    }
  }
`;
export default function CountryDetails() {
  const { loading, error, data } = useQuery(GET_COUNTRY);
  const { countryName } = useParams();
  const navigate = useNavigate();
  polyfillCountryFlagEmojis();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(countryName);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <p
        className="absolute top-10 left-20 font-bold cursor-pointer"
        onClick={() => navigate(-1)}
      >
        BACK
      </p>
      <div className="w-4/5 mt-10 pb-10 gap-10 flex flex-row flex-wrap items-center justify-center">
        {data &&
          data.countries
            .filter((el: any) => el.name === countryName)
            .map((country: any) => (
              <div className="w-1/2 h-fit flex flex-col items-center justify-center p-20 border-gray-600 border-[2px] rounded-lg">
                <p className="text-center font-bold text-lg">{country.name}</p>
                <p>{country.emoji}</p>
                <p className="text-center">Currency : {country.currency}</p>
                <p className="text-center">Capital : {country.capital}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
