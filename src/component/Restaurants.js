import React, { useState } from "react";
// import PropTypes from "prop-types";
import { RestaurantListItem } from "./RestaurantListItem";

/**
 * Displays information about available restaurants.
 * @returns {JSX.Element}
 */
function Restaurants (props) {
    const [cities, setCities] = useState({});
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [restaurants, setRestaurants] = useState({});

    const cityChange = evt => {
        const { value: nextCityValue } = evt.target;
        setCity(nextCityValue);

        // Fetch restaurants/
        if (nextCityValue && (!restaurants[region] || !restaurants[region][nextCityValue])) {
            fetchRestaurants(region, nextCityValue);
        }
    };

    const regionChange = evt => {
        const { value: nextRegionValue } = evt.target;
        setRegion(nextRegionValue);
        setCity("");

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
        // {"data":[{"name":"Pig Place","slug":"pig-place","images":{"thumbnail":"node_modules/place-my-order-assets/images/1-thumbnail.jpg","owner":"node_modules/place-my-order-assets/images/2-owner.jpg","banner":"node_modules/place-my-order-assets/images/1-banner.jpg"},"menu":{"lunch":[{"name":"Steamed Mussels","price":21.99},{"name":"Gunthorp Chicken","price":21.99},{"name":"Charred Octopus","price":25.99}],"dinner":[{"name":"Crab Pancakes with Sorrel Syrup","price":35.99},{"name":"Truffle Noodles","price":14.99},{"name":"Garlic Fries","price":15.99}]},"address":{"street":"3108 Winchester Ct.","city":"Detroit","state":"MI","zip":"60602"},"_id":"0OPHdlfpfEXxVwaT"},{"name":"Cow Barn","slug":"cow-barn","images":{"thumbnail":"node_modules/place-my-order-assets/images/2-thumbnail.jpg","owner":"node_modules/place-my-order-assets/images/2-owner.jpg","banner":"node_modules/place-my-order-assets/images/4-banner.jpg"},"menu":{"lunch":[{"name":"Spinach Fennel Watercress Ravioli","price":35.99},{"name":"Truffle Noodles","price":14.99},{"name":"Charred Octopus","price":25.99}],"dinner":[{"name":"Herring in Lavender Dill Reduction","price":45.99},{"name":"Chicken with Tomato Carrot Chutney Sauce","price":45.99},{"name":"Garlic Fries","price":15.99}]},"address":{"street":"230 W Kinzie Street","city":"Detroit","state":"MI","zip":"48229"},"_id":"jTEqxWFkp96imHPQ"}]}
        restaurantList = restaurants[region][city].map(x => {
            const { address, images, name, slug } = x;
            const rliProps = { address, name, slug, thumbnail: images.thumbnail };
            return (<RestaurantListItem {...rliProps} />);
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

async function apiFetch(url) {
    const response = await fetch(url);
    return await response.json();
}
