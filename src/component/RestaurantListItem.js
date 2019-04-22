import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

 /**
  * Display restaurant information in a list format.
  * @returns {JSX.Element}
  */
export default function RestaurantListItem ({ address, name, selected, slug, thumbnail }) {
    return (
        <div className="restaurant">
            <img src={thumbnail} alt={name} height="100" width="100" />
            <h3>{name}</h3>
            <div className="address">
                {address.street}<br />{address.city}, {address.state} {address.zip}
            </div>
            <div className="hours-price">
                $$$<br />Hours: M-F 10am-11pm<span className="open-now">Open Now</span>
            </div>
            <Link className="btn" onClick={() => selected(slug)} to={`restaurants/${slug}`}>Details</Link>
            <br />
        </div>
    )
};

RestaurantListItem.propTypes = {
    address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.func,
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
};
