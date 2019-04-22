import React, { useContext } from "react";
import AppContext from "../AppContext";

/**
 * Displays information about a single restaurant.
 * @returns {JSX.Element}
 */
export default function RestaurantDetail(props) {
    /** @type {AppContextValue} */
    const context = useContext(AppContext);
    const { city, region, slug } = context.currentRestaurant;

    const restaurant = context.restaurants[region][city].find(x => x.slug === slug);

    const headerProps = {
        className: "restaurant-header",
        style: {
            backgroundImage: `url(${window.location.origin}/${restaurant.resources.banner}`
        }
    };

    return (
        <>
            <div {...headerProps}>
                <div className="background">
                    <h2>{restaurant.name}</h2>
                    <div className="address">
                        {restaurant.address.street}<br />{restaurant.address.city}, ${restaurant.address.state} ${restaurant.address.zip}
                    </div>
                    <div className="hours-price">
                        $$$<br />Hours: M-F 10am-11pm
                        <span className="open-now">Open Now</span>
                    </div>
                    <br />
                </div>
            </div>
            <div className="restaurant-content">
                <h3>The best food this side of the Mississippi</h3>
                <p className="description">
                    <img alt={`The owner of ${restaurant.name}.`} src={"/" + restaurant.resources.owner} />
                    Description for {restaurant.name}
                </p>
                <p className="order-link">
                    <a className="btn" href={`${restaurant.slug}/order`}>Order from {restaurant.name}</a>
                </p>
            </div>
        </>
    );
}

/**
 * @typedef {import('../AppContext').AppContextValue} AppContextValue
 */
