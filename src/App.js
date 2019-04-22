import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { get as apiGet } from "./api";
import AppContext from "./AppContext";
import Header from "./component/Header";
import Home from "./component/Home";
import Restaurants from "./component/Restaurants";
import RestaurantDetail from "./component/RestaurantDetail";
import RestaurantOrder from "./component/RestaurantOrder";
import OrderHistory from "./component/OrderHistory";

export default function App() {
  const [context, dispatch] = useReducer(contextReducer, {
    currentRestaurant: {},
    getRestaurants: (region, city) => {
      dispatch({
        city,
        region,
        restaurants: null,
        type: "update-restaurants",
      });
    },
    restaurants: {},
    setCurrentRestaurant: (region, city, slug) => {
      dispatch({
        city,
        region,
        slug,
        type: "set-current-restaurant",
      });
    }
  });

  useEffect(() => {
    const { restaurants } = context;
    for (let region in restaurants) {
      for (let city in restaurants[region]) {
        if (restaurants[region][city]) {
          continue;
        }

        console.log(`get restaurants: ${region}, ${city}`);

        apiGet(`/restaurants?filter[address.state]=${region}&filter[address.city]=${city}`)
          .then(({ data }) => {
            dispatch({
              city,
              region,
              restaurants: data,
              type: "update-restaurants",
            });
          });
      }
    }
  }, [context.restaurants]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppContext.Provider value={context}>
          <Switch>
            <Route exact path="/restaurants" render={() => <Restaurants />} />
            <Route exact path={`/restaurants/:slug`} render={() => <RestaurantDetail />} />
            <Route path={`/restaurants/:slug/order`} render={() => <RestaurantOrder />} />
            <Route path="/order-history" component={OrderHistory} />
            <Route path="/" component={Home} />
          </Switch>
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

/**
 * @param {AppContextValue} state 
 * @param {{ city: string; region: string; slug: string; type: "set-current-restaurant"} | { city: string; region: string; restaurants: RestaurantData[]; type: "update-restaurants"}} action 
 * @returns {AppContextValue}
 */
function contextReducer(state, action) {
  /** @type {AppContextValue} */
  let nextState;
  switch(action.type) {

    case "set-current-restaurant": {
      const { city, region, slug } = action;
      const { currentRestaurant } = state;
      if (
        (city && city !== currentRestaurant.city) ||
        (region && region !== currentRestaurant.region) ||
        (slug && slug !== currentRestaurant.slug)
      ) {
        nextState = { ...state, ...{ currentRestaurant: { city, region, slug } } };
      }
      break;
    }

    case "update-restaurants": {
      const { city, region } = action;
      if (city && region) {
        const { restaurants } = state;
        if (!restaurants[region] || !restaurants[region][city]) {
          const nextRestaurants = { ...restaurants };
          nextRestaurants[region] = { ...restaurants[region] };
          nextRestaurants[region][city] = action.restaurants;
  
          nextState = { ...state, ...{ restaurants: nextRestaurants } };
        }
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
