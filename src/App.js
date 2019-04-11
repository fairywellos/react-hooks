import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { constants } from "./constants";
import { Header } from "./component/Header";
import { Home } from "./component/Home";
import { Restaurants } from "./component/Restaurants";
import { RestaurantDetail } from "./component/RestaurantDetail";
import { OrderHistory } from "./component/OrderHistory";


function App() {
  function restaurantSelected(rProps) {
    console.log(rProps);
  };

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={`/${constants.pageRestaurants}`} render={() => <Restaurants selected={restaurantSelected} />} />
          <Route path={`/${constants.pageRestaurants}/:slug`} render={() => <RestaurantDetail />} />
          <Route path={`/${constants.pageOrderHistory}`} component={OrderHistory} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export { App };
