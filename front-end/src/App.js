import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  ReservedItemsList,
  EditSingleProduct,
} from "./pages";
import CreateSingleProductPage from "./pages/CreateSingleProductPage";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route
            exact
            path='/products/edit/create'
            children={<CreateSingleProductPage />}
          />
          <Route
            exact
            path='/products/edit/:id'
            children={<EditSingleProduct />}
          />
          <Route exact path='/products/:id' children={<SingleProduct />} />

          <PrivateRoute exact path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <Route exact path='/all-reserved'>
            <ReservedItemsList />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
