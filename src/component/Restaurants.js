import React, { useContext, useEffect, useState } from "react";
import { get as apiGet } from "../api";
import AppContext from "../AppContext";
import RestaurantListItem from "./RestaurantListItem";

/**
 * Displays information about available restaurants.
 * @returns {JSX.Element}
 */
export default function Restaurants () {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState({});
    const [city, setCity] = useState(DEFAULT_SELECT_VALUE);
    const [region, setRegion] = useState(DEFAULT_SELECT_VALUE);
    /** @type {AppContextValue} */
    const context = useContext(AppContext);

    useEffect(() => {
        // Fetch all regions (states) when the component is initially rendered.
        if (regions.length) {
            return;
        }

        async function getStates() {
            const { data } = await apiGet("/states");
            setRegions(data);
        }

        getStates();
    });

    useEffect(() => {
        // Fetch a region's cities when the region is selected by the user. 
        if (!region || cities[region]) {
            return;
        }

        async function getCities() {
            const { data } = await apiGet(`/cities?filter[state]=${region}`);
            setCities({ ...cities, [region]: data });
        }

        getCities();
    }, [region]);

    function onCityChange(evt) {
        setCity(evt.target.value);
        context.getRestaurants(region, evt.target.value);
    }

    function onRegionChange(evt) {
        setRegion(evt.target.value);
        setCity(DEFAULT_SELECT_VALUE);
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
                    thumbnail={resources.thumbnail}
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

const DEFAULT_SELECT_VALUE = "";
const LOADING_MESSAGE = "Loading...";

/**
 * @typedef {import('../AppContext').AppContextValue} AppContextValue
 */
