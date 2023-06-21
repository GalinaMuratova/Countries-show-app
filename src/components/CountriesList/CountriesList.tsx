import React, { useState, useEffect } from 'react';
import axios from "axios";

interface Props {
    onSelectCountry: (countryCode: string) => void;
}

interface State {
    alpha3Code: string;
    name: string;
}

const CountriesList:React.FC<Props> = ({onSelectCountry}) => {
    const [countries, setCountries] = useState<State[]>([]);

    useEffect(() => {
        getCountryList();
    }, []);

    const getCountryList = () => {
        axios.get('https://restcountries.com/v2/all?fields=alpha3Code,name')
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));
    };

    const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = event.target.value;
        onSelectCountry(countryCode);
        console.log(countries);
    };

    return (
        <div>
            <h2>Countries</h2>
            <select onChange={changeSelect}>
                <option value="">Choose country</option>
                {countries.map(country => (
                    <option key={country.alpha3Code} value={country.alpha3Code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountriesList;