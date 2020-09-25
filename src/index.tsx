import React from "react"
import ReactDOM from "react-dom"
import "mobx-react-lite/batchingForReactDom"

import * as serviceWorker from "./serviceWorker"

import App from "@/App"

ReactDOM.render(<App />, document.getElementById("root"))

serviceWorker.unregister()
