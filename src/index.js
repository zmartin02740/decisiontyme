import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const history = createBrowserHistory();

const app = (
  <Router history={history}>
    <App history={history} />
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
