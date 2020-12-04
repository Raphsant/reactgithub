import React, { useEffect, useState } from "react";
import "./app.css";
import "./login.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import MainPage from "../pages/main-page";
import { provider, auth } from "../data/firebase";
import Nav from "./nav";
import AccountPage from "../pages/account-page";

function AuthenticatedRouter(props) {
  const { isAuthenticated, children, ...routeProps } = props;
  return (
    <Route {...routeProps}>
      {" "}
      {isAuthenticated ? children : <Redirect to="/account" />}
    </Route>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Auth State changed");
      console.log(currentUser);
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  return (
    <BrowserRouter>
      <Nav user={user} />
      <Switch>
        <AuthenticatedRouter path="/" exact isAuthenticated={isAuthenticated}>
          <MainPage path="/" user={user} />
        </AuthenticatedRouter>
        <Route path="/account">
          <AccountPage user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
