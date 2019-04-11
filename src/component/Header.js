import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { constants } from "../constants";

/**
 * Displays information about the app and a menu of choices.
 * @returns {JSX.Element}
 */
function Header (props) {
    const { pathname } = props.location;

    return (
        <header>
            <nav>
                <h1>place-my-order.com</h1>
                <ul>
                    <li className={pathname === "/" ? "active" : ""}><Link to="/">Home</Link></li>
                    <li className={pathname.startsWith(`/${constants.pageRestaurants}`) ? "active" : ""}><Link to={`/${constants.pageRestaurants}`}>Restaurants</Link></li>
                    <li className={pathname === `/${constants.pageOrderHistory}` ? "active" : ""}><Link to={`/${constants.pageOrderHistory}`}>Order History</Link></li>
                </ul>
            </nav>
        </header>
    );
}

Header.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    })
};

const wrappedHeader = withRouter(Header);

export { wrappedHeader as Header };
