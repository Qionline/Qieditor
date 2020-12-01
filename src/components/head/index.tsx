import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons"

import "./index.less"
import config from "../../../package.json"
import FileMenu from "@/components/head/file"
import FeatureMenu from "@/components/head/feature"
import AssistMenu from "@/components/head/assist"

const HeadComponent: React.FC = () => {
  const [fullScreenState, setFullScreenState] = useState(false)

  const toggleFullScreen = () => {
    const doc: any = document
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      setFullScreenState(true)
      if (doc.documentElement.requestFullscreen) doc.documentElement.requestFullscreen()
      else if (doc.documentElement.msRequestFullscreen) doc.documentElement.msRequestFullscreen()
      else if (doc.documentElement.mozRequestFullScreen) doc.documentElement.mozRequestFullScreen()
      else if (doc.documentElement.webkitRequestFullscreen) doc.documentElement.webkitRequestFullscreen()
    } else {
      setFullScreenState(false)
      if (doc.exitFullscreen) doc.exitFullscreen()
      else if (doc.msExitFullscreen) doc.msExitFullscreen()
      else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen()
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen()
    }
  }
  return (
    <div className="head-cmp">
      <div className="head-menu">
        <div className="logo">
          <img src={require("@/images/icon.png")} alt="" />
          Qieditor
          <i>v{config.version}</i>
        </div>
        <FileMenu />
        <FeatureMenu />
        <AssistMenu />
      </div>
      <div className="head-tools">
        {fullScreenState ? <FullscreenExitOutlined onClick={toggleFullScreen} className="head-tools-item" /> : <FullscreenOutlined onClick={toggleFullScreen} className="head-tools-item" />}
      </div>
    </div>
  )
}

export default observer(HeadComponent)
