

import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";


/**
 * @typedef HeaderProps
 */

/**
 * Displays information about the app and a menu of choices.
 * @param {HeaderProps} props
 * @returns {JSX.Element}
 */
const Header = withRouter(props => {
    const { pathname } = props.location;

    return (
        <header>
            <nav>
                <h1>place-my-order.com</h1>
                <ul>
                    <li className={pathname === "/" ? "active" : ""}><NavLink to="/">Home</NavLink></li>
                    <li className={pathname === "/restaurants" ? "active" : ""}><NavLink to="/restaurants">Restaurants</NavLink></li>
                    <li className={pathname === "/order-history" ? "active" : ""}><NavLink to="/order-history">Order History</NavLink></li>
                </ul>
            </nav>
        </header>
    );
});

Header.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
};

export { Header };
