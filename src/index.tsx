import "./runConcent";
import * as React from "react";
import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
console.log("  ****** render App ******  ");
render(<App />, rootElement);
