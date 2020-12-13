import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { auth } from "../data/firebase";
import AccountPage from "../pages/account-page";
import MainPage from "../pages/main-page";
import Nav from "./nav";
import useUser from "./hooks/use-user";
import "./app.css";
import "./login.css";

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
  const [isLoading, error, user] = useUser(auth);
  const isAuthenticated = user !== null;
  if (error) console.error(error);
  if (isLoading) return null;

  return (
    <BrowserRouter>
      <Nav user={user} />
      <Switch>
        <AuthenticatedRouter path="/" exact isAuthenticated={isAuthenticated}>
          <MainPage user={user} />
        </AuthenticatedRouter>
        <Route path="/account">
          <AccountPage user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
