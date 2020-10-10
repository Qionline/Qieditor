import React from "react"
import { observer } from "mobx-react-lite"

import { ReactComponent as IosSVG } from "@/images/ios.svg"
import { ReactComponent as AndroidSVG } from "@/images/android.svg"
import "./index.less"
import { useDataStore, useLocalSettingStore } from "@/stores"
import { SData2Html } from "@/core/data2html"
import { Local2Html } from "@/core/local2html"

const ShowComponent: React.FC = () => {
  const { globalSetting, mainTree } = useDataStore()
  const { localSetting, handleSetPhoneType } = useLocalSettingStore()

  return (
    <div className="show-cmp">
      <div className="show-cmp-phoneType">
        <div
          onClick={() => {
            handleSetPhoneType("ios")
          }}
          className={localSetting.phoneType === "ios" ? "show-cmp-phoneType-active" : ""}
        >
          <IosSVG style={{ fill: localSetting.phoneType === "ios" ? "#fff" : "#e07300" }} />
          ios
        </div>
        <div
          onClick={() => {
            handleSetPhoneType("android")
          }}
          className={localSetting.phoneType === "android" ? "show-cmp-phoneType-active" : ""}
        >
          <AndroidSVG style={{ fill: localSetting.phoneType === "android" ? "#fff" : "#e07300" }} />
          android
        </div>
      </div>
      <div className="show-cmp-title">{globalSetting.global.title}</div>
      <div className="show-cmp-box">
        <iframe title="a" width="100%" height="100%" frameBorder="0" srcDoc={SData2Html(globalSetting, mainTree, Local2Html(localSetting))} />
      </div>
    </div>
  )
}

export default observer(ShowComponent)
