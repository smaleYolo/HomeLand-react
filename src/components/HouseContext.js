import React, {useState, useEffect, createContext} from 'react';
import {housesData} from '../data'

export const HouseContext = createContext()

const HouseContextProvider = ({children}) => {
    const [houses, setHouses] = useState(housesData)
    const [country, setCountry] = useState('Location (any)')
    const [countries, setCountries] = useState([])
    const [property, setProperty] = useState('Property type (any)')
    const [properties, setProperties] = useState([])
    const [price, setPrice] = useState('Price range (any)')
    const [loading, setLoading] = useState(false)

    //return all countries
    useEffect(() => {
        const allCountries = houses.map(house => house.country)
        const uniqueCountries = ['Location (any)', ...new Set(allCountries)]

        setCountries(uniqueCountries)

    }, [])

    //return all properties
    useEffect(() => {
        const allTypes = houses.map(house => house.type)
        const uniqueTypes = ['Property type (any)', ...new Set(allTypes)]

        setProperties(uniqueTypes)

    }, [])

    const handleClick = () => {
        setLoading(true)
        const isDefault = (str) => {
            return str.split(' ').includes('(any)')
        }

        const minPrice = parseInt(price.split(' ')[0])
        const maxPrice = parseInt(price.split(' ')[2])
        const newHouses = housesData.filter((house) => {
            const housePrice = parseInt(house.price);

            //all not default
            if (
                house.country === country &&
                house.type === property &&
                housePrice >= minPrice &&
                housePrice <= maxPrice
            ) {
                return house
            }

            //all default
            if (isDefault(country) && isDefault(property) && isDefault(price)) {
                return house;
            }

            //country is NOT default
            if (!isDefault(country) && isDefault(property) && isDefault(price)) {
                return house.country === country
            }

            //property is NOT default
            if (!isDefault(property) && isDefault(country) && isDefault(price)) {
                return house.type === property
            }

            //price is NOT default
            if (!isDefault(price) && isDefault(country) && isDefault(property)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house
                }
            }

            //country && property is NOT default
            if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
                if (house.country === country && house.type === property) {
                    return house
                }
            }

            //country && price is NOT default
            if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.country === country
                }
            }

            //property && price is NOT default
            if (!isDefault(property) && !isDefault(price) && isDefault(country)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.type === property
                }
            }
        })
        setTimeout(() => {
            return newHouses < 1 ? setHouses([]) : setHouses(newHouses),
                setLoading(false)
        }, 1000)
    }


    return (
        <HouseContext.Provider value={{
            country,
            setCountry,
            countries,
            property,
            setProperty,
            properties,
            price,
            setPrice,
            houses,
            loading,
            handleClick,
        }}>
            {children}
        </HouseContext.Provider>
    );
};

export default HouseContextProvider;
