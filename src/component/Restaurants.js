import React, { useState } from "react";
import PropTypes from "prop-types";
import { RestaurantListItem } from "./RestaurantListItem";

const DEFAULT_SELECT_VALUE = "";

/**
 * Information about the restaurants in a city.
 * @typedef {Object.<string, any[]>} RestaurantCityData
 */

/**
 * Information about restaurants in a region's cities.
 * @typedef {Object.<string, RestaurantCityData>} RestaurantData
 */

/**
 * Displays information about available restaurants.
 * @returns {JSX.Element}
 */
function Restaurants (props) {
    const [cities, setCities] = useState({});
    const [city, setCity] = useState(DEFAULT_SELECT_VALUE);
    const [region, setRegion] = useState(DEFAULT_SELECT_VALUE);
    /** @type {[RestaurantData, (value: RestaurantData) => void]} */
    const [restaurants, setRestaurants] = useState({});

    const cityChange = evt => {
        const { value: nextCityValue } = evt.target;
        setCity(nextCityValue);

        if (nextCityValue && (!restaurants[region] || !restaurants[region][nextCityValue])) {
            fetchRestaurants(region, nextCityValue);
        }
    };

    const regionChange = evt => {
        const { value: nextRegionValue } = evt.target;
        setRegion(nextRegionValue);
        setCity(DEFAULT_SELECT_VALUE);

        if (nextRegionValue && !cities[nextRegionValue]) {
            fetchCities(nextRegionValue);
        }
    };

    const fetchCities = async cityRegion => {
        const body = await apiFetch(`/cities?filter[state]=${cityRegion}`);
        setCities({ ...cities, [cityRegion]: body.data });
    };

    const fetchRestaurants = async (filterRegion, filterCity) => {
        const body = await apiFetch(`/restaurants?filter[address.state]=${filterRegion}&filter[address.city]=${filterCity}`);
        setRestaurants({ ...restaurants, [filterRegion]: { [filterCity]: body.data } });
    };

    const restaurantSelected = rProps => {
        const restaurant = restaurants[region][city].find(x => x.slug === rProps.slug);
        if (restaurant) {
            props.selected(restaurant);
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
            const { address, images, name, slug } = x;
            const rliProps = { address, name, selected: restaurantSelected, slug, thumbnail: images.thumbnail };
            return (<RestaurantListItem key={region + city + slug} {...rliProps} />);
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

Restaurants.propTypes = {
    selected: PropTypes.func.isRequired
};

export { Restaurants };

async function apiFetch(url) {
    const response = await fetch(url);
    return await response.json();
}
