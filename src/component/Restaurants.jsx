

import React, { useState } from "react";


const api = "/cities";


/**
 * @typedef RestaurantsProps
 */

/**
 * Displays information about available restaurants.
 * @param {RestaurantsProps} props
 * @returns {JSX.Element}
 */
export default props => {
    const [region, setRegion] = useState("");
    const [cities, setCities] = useState({});
    const [city, setCity] = useState("");


    const cityChange = evt => {
        setCity(evt.target.value);
    };

    const regionChange = evt => {
        const { value: nextRegionValue } = evt.target;
        setRegion(nextRegionValue);
        setCity("");

        if (!cities[nextRegionValue]) {
            fetchCities(nextRegionValue);
        }
    };

    const fetchCities = async cityRegion => {
        const response = await fetch(`${api}?filter[state]=${cityRegion}`);
        const body = await response.json();
        setCities({ ...cities, [cityRegion]: body.data });
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

        </div>
    );
}
