import { data } from "jquery";
import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

import db, { usersCollection } from "./data/firebase";

ReactDOM.render(<App></App>, document.querySelector("#root"));
