import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

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
                    <li className={pathname === "/restaurants" ? "active" : ""}><Link to="/restaurants">Restaurants</Link></li>
                    <li className={pathname === "/order-history" ? "active" : ""}><Link to="/order-history">Order History</Link></li>
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
