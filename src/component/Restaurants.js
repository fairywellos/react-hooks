import React, { useContext, useEffect, useState } from "react";
import { getCities, getStates } from "../model/api";
import AppContext from "../AppContext";
import RestaurantListItem from "./RestaurantListItem";

/**
 * Displays information about available restaurants.
 * @returns {JSX.Element}
 */
export default function Restaurants () {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState({});
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    /** @type {AppContextValue} */
    const context = useContext(AppContext);

    useEffect(() => {
        // Fetch all regions (states) when the component is initially rendered.
        if (regions.length) {
            return;
        }

        getStates()
            .then(data => {
                setRegions(data);
            });
    });

    useEffect(() => {
        // Fetch a region's cities when the region is selected by the user. 
        if (!region || cities[region]) {
            return;
        }

        getCities(region)
            .then(data => {
                setCities({ ...cities, [region]: data });
            });
    }, [region]);

    function onCityChange(evt) {
        setCity(evt.target.value);
        context.getRestaurants(region, evt.target.value);
    }

    function onRegionChange(evt) {
        setRegion(evt.target.value);
        setCity("");
    }

    const { restaurants } = context;
    function restaurantSelected(slug) {
        const restaurant = restaurants[region][city].find(x => x.slug === slug);
        if (restaurant) {
            context.setCurrentRestaurant(region, city, restaurant.slug);
        }
    };

    const cityOptions = region
        ? (
            <>
                <option value="">{0 < Object.keys(cities).length ? "Choose a city" : LOADING_MESSAGE}</option>
                {cities && cities[region]
                    ? cities[region].map(({ name }) => (<option key={name} value={name}>{name}</option>))
                    : null
                }
            </>
        )
        : null;

    const restaurantList = restaurants[region] && restaurants[region][city]
        ? restaurants[region][city].map(({ address, resources, name, slug }) => {
            return (
                <RestaurantListItem
                    address={address}
                    key={region + city + slug}
                    name={name}
                    selected={restaurantSelected}
                    slug={slug}
                    thumbnail={`/${resources.thumbnail}`}
                />
            );
        })
        : null;

    return (
        <div className="restaurants">
            <h2 className="page-header">Restaurants</h2>
            <form className="form">
                <div className="form-group">
                    <label>State</label>
                    <select onChange={onRegionChange} value={region}>
                        <option value="">{0 < regions.length ? "Choose a state" : LOADING_MESSAGE}</option>
                        {regions.map(({ name, short }) => (<option key={short} value={short}>{name}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <label>City</label>
                    <select disabled={!region} onChange={onCityChange} value={city}>
                        {cityOptions}
                    </select>
                </div>
            </form>
            {restaurantList}
        </div>
    );
}

const LOADING_MESSAGE = "Loading...";

/**
 * @typedef {import('../AppContext').AppContextValue} AppContextValue
 */
