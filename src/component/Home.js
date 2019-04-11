import React from "react";
import { NavLink } from "react-router-dom";

import heroImage from "../style/images/homepage-hero.jpg";

/**
 * The default component of pmo.
 * @returns {JSX.Element}
 */
function Home() {
    return (
        <div className="homepage">
            <img alt="Restaurant table with glasses." src={heroImage} width="250" height="380"></img>
            <h1>Ordering food has never been easier</h1>
            <p>
                We make it easier than ever to order gourmet food
                from your favorite local restaurants.
            </p>
            <p>
                <NavLink className="btn" role="button" to="/restaurants">Choose a Restaurant</NavLink>
            </p>
        </div>
    );
}

export { Home };
