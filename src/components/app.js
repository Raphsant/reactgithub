import React from "react";
import "./app.css";
import "./login.css";
import {BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/login-page";
import MainPage from "../pages/main-page";

function App() {
  return (
    <BrowserRouter>
      
        
        <Route path="/">
        {localStorage.getItem("username") ?  <Redirect to="/main" /> : <LoginPage/>}        
        </Route>
        <Route path="/main">
        <MainPage/>
        </Route>
        
      
    </BrowserRouter>
  );
}

export default App;
