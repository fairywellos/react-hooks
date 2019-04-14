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

export { get };

/**
 * @typedef ApiResult
 * @property {object | array} data The value of the response's data property or an error message if response.ok is false.
 * @property {Response} response A fetch Response object.
 */

