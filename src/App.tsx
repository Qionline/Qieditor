import React from "react"

import "./App.less"
import BaseRouter from "./router/index"

const App: React.FC = () => {
  return (
    <div className="container">
      <BaseRouter />
    </div>
  )
}

export default App
