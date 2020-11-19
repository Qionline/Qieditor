import React from "react"
import { observer } from "mobx-react-lite"

import "./index.less"
import config from "../../../package.json"
import FileMenu from "@/components/head/file"
import FeatureMenu from "@/components/head/feature"
import AssistMenu from "@/components/head/assist"

const HeadComponent: React.FC = () => {
  return (
    <div className="head-cmp">
      <div className="logo">
        <img src={require("@/images/icon.png")} alt="" />
        Qieditor
        <i>v{config.version}</i>
      </div>
      <FileMenu />
      <FeatureMenu />
      <AssistMenu />
    </div>
  )
}

export default observer(HeadComponent)
