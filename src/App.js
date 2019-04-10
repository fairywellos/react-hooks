import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import Restaurants from "./component/Restaurants";
import OrderHistory from "./component/OrderHistory";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/restaurants" component={Restaurants} />
            <Route path="/order-history" component={OrderHistory} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
