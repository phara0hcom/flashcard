import { render } from "react-dom";
import React from "react";
import App from "./js/App";
import registerServiceWorker from "./registerServiceWorker";

render(<App />, document.getElementById("root"));
registerServiceWorker();