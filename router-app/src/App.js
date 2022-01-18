import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/products/:id" component={ProductDetails} />
          <Route //Route passes history,location and match components by default
            path="/products"
            render={(props) => <Products sortBy="newest" {...props} />} //if we want to pass arguments to component in Route
          />
          <Route path="/posts/:year?/:month?" component={Posts} />
          <Route path="/admin" component={Dashboard} />
          <Redirect from="/messages" to="/posts" />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
};

export default App;
