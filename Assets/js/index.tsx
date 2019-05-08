/**
 * ReactJS
 * 
 * Using Reacts Framework for scalable workflow with the MVC framework
 */

import * as React from "react"
import * as ReactDOM from "react-dom"
import "jquery";
import "popper.js";
import "bootstrap";
import "../scss/app.scss"
import App from "./App"

// let app: HTMLElement = document.getElementById('app');

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);