import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Books from "./components/books";
import Readers from "./components/readers";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import BookForm from "./components/bookForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/books/:isbn" component={BookForm} />
          <Route path="/books" component={Books} />
          <Route path="/readers" component={Readers} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/books" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
