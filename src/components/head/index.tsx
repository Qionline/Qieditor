import React from "react"
import { observer } from "mobx-react-lite"

import "./index.less"
import FileMenu from "@/components/head/file"
import AssistMenu from "@/components/head/assist"

const HeadComponent: React.FC = () => {
  return (
    <div className="head-cmp">
      <div className="logo">
        <img src={require("@/images/logo.gif")} alt="" />
        Qieditor
      </div>
      <FileMenu />
      <AssistMenu />
    </div>
  )
}

export default observer(HeadComponent)
