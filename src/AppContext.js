import React from 'react';

/** @type {AppContextValue} */
const AppContext = React.createContext({
    restaurant: {
        current: {},
        get: (region, city) => {},
        restaurants: {},
        setCurrent: (region, city, slug) => {}
    }
});

export { AppContext };

/**
 * Response data from the API with information about the restaurants in a city.
 * @typedef {object} RestaurantData
 * @property {object} address
 * @property {string} address.city
 * @property {string} address.state
 * @property {string} address.street
 * @property {string} address.zip
 * @property {object} resources
 * @property {string} name
 * @property {string} slug
 */

/**
 * Information about the restaurants in a city.
 * @typedef {Object.<string, RestaurantData[]>} RestaurantCityData
 */

/**
 * Information about restaurants in a region's cities.
 * @typedef {Object.<string, RestaurantCityData>} RestaurantRegionData
 */

/**
 * @typedef {object} RestaurantContextValue
 * @property {object} current
 * @property {string} current.city
 * @property {string} current.region
 * @property {string} current.slug
 * @property {(region: string, city: string) => void} get
 * @property {RestaurantRegionData} restaurants
 * @property {(region: string, city: string, slug: string) => void} setCurrent
 */

/**
 * @typedef {object} AppContextValue
 * @property {RestaurantContextValue} restaurant
 */
