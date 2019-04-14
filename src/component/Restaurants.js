import React, { useContext, useState } from "react";
import { get as apiGet } from "../api";
import { AppContext } from "../AppContext";
import { RestaurantListItem } from "./RestaurantListItem";

/**
 * Displays information about available restaurants.
 * @returns {JSX.Element}
 */
function Restaurants (props) {
    const [cities, setCities] = useState({});
    const [city, setCity] = useState(DEFAULT_SELECT_VALUE);
    const [region, setRegion] = useState(DEFAULT_SELECT_VALUE);
    /** @type {AppContextValue} */
    const context = useContext(AppContext);

    function cityChange(evt) {
        const { value: nextCity } = evt.target;
        setCity(nextCity);

        if (nextCity && region) {
            context.restaurant.get(region, nextCity);
        }
    }

    function regionChange(evt) {
        const { value: nextRegion } = evt.target;
        setRegion(nextRegion);
        setCity(DEFAULT_SELECT_VALUE);

        if (nextRegion && !cities[nextRegion]) {
            fetchCities(nextRegion);
        }
    }

    async function fetchCities(cityRegion) {
        const { data } = await apiGet(`/cities?filter[state]=${cityRegion}`);
        setCities({ ...cities, [cityRegion]: data });
    }

    const { restaurants } = context.restaurant;
    function restaurantSelected(rProps) {
        const restaurant = restaurants[region][city].find(x => x.slug === rProps.slug);
        if (restaurant) {
            context.restaurant.setCurrent(region, city, restaurant.slug);
        }
    };

    let cityOptions = null;
    if (region && cities && cities[region]) {
        cityOptions = (
            <>
                <option value="">Choose a city</option>
                {cities[region].map(x => (<option key={x.name} value={x.name}>{x.name}</option>))}
            </>
        );
    }

    let restaurantList = null;
    if (restaurants[region] && restaurants[region][city]) {
        restaurantList = restaurants[region][city].map(x => {
            const { address, resources, name, slug } = x;
            const itemProps = { address, name, selected: restaurantSelected, slug, thumbnail: resources.thumbnail };
            return (<RestaurantListItem key={region + city + slug} {...itemProps} />);
        });
    }

    return (
        <div className="restaurants">
            <h2 className="page-header">Restaurants</h2>
            <form className="form">
                <div className="form-group">
                    <label>State</label>
                    <select onChange={regionChange} value={region}>
                        <option value="">Choose a state</option>
                        <option value="IL">Illinois</option>
                        <option value="MI">Michigan</option>
                        <option value="WI">Wisconsin</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>City</label>
                    <select disabled={!region} onChange={cityChange} value={city}>
                        {cityOptions}
                    </select>
                </div>
            </form>
            {restaurantList}
        </div>
    );
}

export { Restaurants };

const DEFAULT_SELECT_VALUE = "";

/**
 * @typedef {import('../AppContext').AppContextValue} AppContextValue
 */
