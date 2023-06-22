import React, {useState} from 'react';
import CountriesList from "./components/CountriesList/CountriesList";
import CountryInformation from "./components/CountryInformation/CountryInformation";
import './App.css';

function App() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const changeCountrySelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        console.log(selectedCountry);
    };

  return (
    <div className="App">
      <CountriesList onSelectCountry={changeCountrySelect}/>
        <CountryInformation countryCode={selectedCountry}/>
    </div>
  );
}

export default App;
