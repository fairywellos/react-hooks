/**
 * Get the cities for a region.
 * @param {string} region
 * @returns {any[]} The cities.
 */
async function getCities(region) {
    const { data } = await get(`/cities?filter[state]=${region}`);
    return data;
}

/**
 * Get the restaurants for a region / city combination.
 * @param {string} region
 * @param {string} city
 * @returns {any[]} The restaurants.
 */
async function getRestaurants(region, city) {
    const { data } = await get(`/restaurants?filter[address.state]=${region}&filter[address.city]=${city}`);
    return data;
}

/**
 * Get the available states.
 * @returns {any[]} The states.
 */
async function getStates() {
    const { data } = await get("/states");
    return data;
}

/**
 * Get data from the api and return it.
 * @param {string} url The URL to an api resource.
 * @returns {ApiResult}
 */
async function get(url) {
    const response = await fetch(url);

    let result;
    if (response.ok) {
        result = await response.json();
    } else {
        const data = await response.text();
        result = { data };
    }

    return { data: result.data, response };
}

export { getCities, getRestaurants, getStates };

/**
 * @typedef ApiResult
 * @property {object | array} data The value of the response's data property or an error message if response.ok is false.
 * @property {Response} response A fetch Response object.
 */
