import React from 'react';
import axios from "axios";
import './App.css';
import CountriesList from "./components/CountriesList/CountriesList";
import CountryInformation from "./components/CountryInformation/CountryInformation";

function App() {
  return (
    <div className="App">
      <CountriesList />
        <CountryInformation/>
    </div>
  );
}

export default App;
