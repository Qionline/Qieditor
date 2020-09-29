import React from "react"
import { observer } from "mobx-react-lite"
import "./index.less"

import HeadComponent from "@/components/head"
import { CompComponent, ShowComponent, ConfComponent } from "@/components/main"

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="head-bar">
        <HeadComponent />
      </div>
      <div className="main-container">
        <div className="components-container">
          <CompComponent />
        </div>
        <div className="show-container">
          <ShowComponent />
        </div>
        <div className="config-container">
          <ConfComponent />
        </div>
      </div>
    </div>
  )
}

export default observer(Home)
