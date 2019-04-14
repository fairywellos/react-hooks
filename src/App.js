import React, { useReducer } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { constants } from "./constants";
import { get as apiGet } from "./api";
import { AppContext } from "./AppContext";
import { Header } from "./component/Header";
import { Home } from "./component/Home";
import { Restaurants } from "./component/Restaurants";
import { RestaurantDetail } from "./component/RestaurantDetail";
import { RestaurantOrder } from "./component/RestaurantOrder";
import { OrderHistory } from "./component/OrderHistory";

function App() {
  const [context, dispatch] = useReducer(contextReducer, {
    restaurant: {
      current: {},
      restaurants: {}
    },
  });

  // Update context functions here otherwise they will be stale and will keep a
  // reference to the initial context (these functions are not changed by the
  // reducer).
  context.restaurant.get = (region, city) => {
    getRestaurants(region, city);
  };

  context.restaurant.setCurrent = (region, city, slug) => {
    dispatch({
      city,
      region,
      slug,
      type: "restaurant-current",
    });
  }

  async function getRestaurants(region, city) {
    if (context.restaurant.restaurants[region] && context.restaurant.restaurants[region][city]) {
      return;
    }

    const { data } = await apiGet(`/restaurants?filter[address.state]=${region}&filter[address.city]=${city}`);

    dispatch({
      city,
      region,
      restaurants: data,
      type: "restaurant-restaurants",
    });
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppContext.Provider value={context}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={`/${constants.pageRestaurants}`} render={() => <Restaurants />} />
            <Route exact path={`/${constants.pageRestaurants}/:slug`} render={() => <RestaurantDetail />} />
            <Route exact path={`/${constants.pageRestaurants}/:slug/order`} render={() => <RestaurantOrder />} />
            <Route path={`/${constants.pageOrderHistory}`} component={OrderHistory} />
          </Switch>
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export { App };

/**
 * @param {AppContextValue} state 
 * @param {{ city: string; region: string; slug: string; type: "restaurant-current"} | { city: string; region: string; restaurants: RestaurantData[]; type: "restaurant-restaurants"}} action 
 * @returns {AppContextValue}
 */
function contextReducer(state, action) {
  /** @type {AppContextValue} */
  let nextState;
  switch(action.type) {

    case "restaurant-current": {
      const { city, region, slug } = action;
      const { restaurant } = state;
      const { current } = restaurant;
      if (
        (city && city !== current.city) ||
        (region && region !== current.region) ||
        (slug && slug !== current.slug)
      ) {
        nextState = { ...state };
        nextState.restaurant = { ...restaurant, ...{ current: { city, region, slug } } };
      }
      break;
    }

    case "restaurant-restaurants": {
      const { city, region } = action;
      const { restaurant } = state;
      const { restaurants } = restaurant;
      if (!restaurants[region] || !restaurants[region][city]) {
        const nextRestaurants = { ...restaurants };
        nextRestaurants[region] = { ...restaurants[region] };
        nextRestaurants[region][city] = action.restaurants;

        nextState = { ...state };
        nextState.restaurant = { ...restaurant, ...{ restaurants: nextRestaurants } };
      }
      break;
    }

    default:
      break;
  }

  return nextState || state;
}

/**
 * @typedef {import('./AppContext').AppContextValue} AppContextValue
 */
