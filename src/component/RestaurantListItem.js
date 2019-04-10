import React from "react";
import PropTypes from "prop-types";

 /**
  * Display restaurant information in a list format.
  * @returns {JSX.Element}
  */
function RestaurantListItem (props) {
    const { address, name, thumbnail } = props;
    return (
        <div className="restaurant">
            <img src={thumbnail} alt={name} height="100" width="100" />
            <h3>{name}</h3>
            <div className="address">
                {address.street}<br />{address.city}, {address.state} {address.zip}
            </div>
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
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
};

export { RestaurantListItem };