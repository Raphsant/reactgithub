import React from "react";
import "./app.css";
import "./login.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/login-page";
import MainPage from "../pages/main-page";

function App() {
  if (localStorage.getItem("username") == null) {
    return <LoginPage />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage/>
        </Route>     
      </Switch>
    </BrowserRouter>
  );
}

export default App;
