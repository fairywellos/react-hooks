import React from 'react';

/** @type {AppContextValue} */
export default React.createContext({
    currentRestaurant: {},
    getRestaurants: (region, city) => {},
    restaurants: {},
    setCurrentRestaurant: (region, city, slug) => {}
});

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
 * @typedef {object} AppContextValue
 * @property {object} currentRestaurant
 * @property {string} currentRestaurant.city
 * @property {string} currentRestaurant.region
 * @property {string} currentRestaurant.slug
 * @property {(region: string, city: string) => void} getRestaurants
 * @property {RestaurantRegionData} restaurants
 * @property {(region: string, city: string, slug: string) => void} setCurrentRestaurant
 */
