import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
    countryCode: string | null;
}

interface State {
    name: string;
    borderCountries: string[];
    capital: string;
    flag: string;
}

const CountryInformation: React.FC<Props> = ({ countryCode }) => {
    const [country, setCountry] = useState<State | null>(null);

    useEffect(() => {
        if (countryCode) {
            getCountryInfo();
        }
    }, []);

    const getCountryInfo = async () => {
        try {
            const countryResponse = await axios.get(
                `https://restcountries.com/v2/alpha/${countryCode}`
            );
            const { name, borders, capital, flag } = countryResponse.data;

            const borderCountries = await Promise.all(
                borders.map((borderCode: string) =>
                    axios
                        .get(`https://restcountries.com/v2/alpha/${borderCode}`)
                        .then((response) => response.data.name)
                )
            );

            setCountry({ name, borderCountries, capital, flag });
        } catch (error) {
            console.error(error);
            setCountry(null);
        }
    };

    if (!country) {
        return <p>Choose country</p>;
    }

    const { name, borderCountries, capital, flag } = country;

    return (
        <div>
            <h2>{name}</h2>
            {borderCountries.length > 0 && (
                <p><b>Borders with: </b>{borderCountries.join(', ')}</p>
            )}
            <p><b>Capital: </b>{capital}</p>
            <img src={flag} alt={`${name} flag`} style={{ width: '200px' }} />
        </div>
    );
};

export default CountryInformation;

