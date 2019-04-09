

import React from "react";
import { NavLink } from "react-router-dom";


/**
 * @typedef HeaderProps
 */

/**
 * Displays information about the app and a menu of choices.
 * @param {HeaderProps} props
 * @returns {JSX.Element}
 */
export default props => {
    return (
        <header>
            <nav>
                <h1>place-my-order.com</h1>
                <ul>
                    <li><NavLink activeClassName="active" to="/">Home</NavLink></li>
                    <li><NavLink activeClassName="active" to="/restaurants">Restaurants</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}
