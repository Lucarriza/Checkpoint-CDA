import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Countries from "./Components/Countries";
import CountryDetails from "./Components/CountryDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:continentName/" element={<Countries />} />
      <Route
        path="/:continentName/:countryName/"
        element={<CountryDetails />}
      />
    </Routes>
  );
}

export default App;
