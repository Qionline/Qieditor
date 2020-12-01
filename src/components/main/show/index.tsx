import React, { useEffect } from "react"
import { AndroidFilled, AppleFilled } from "@ant-design/icons"
import { observer } from "mobx-react-lite"

import "./index.less"
import { ScrollPositonSetting } from "@/core/feature/scrollPositionCache"
import { useDataStore, useLocalSettingStore } from "@/stores"
import { SData2Html } from "@/core/data2html"
import { Local2Html } from "@/core/local2html"

const ShowComponent: React.FC = () => {
  const { globalSetting, mainTree } = useDataStore()
  const { localSetting, handleSetPhoneType } = useLocalSettingStore()

  useEffect(() => {
    window.addEventListener(
      "message",
      event => {
        if (event && typeof event.data === "number") {
          ScrollPositonSetting.num = event.data
        }
      },
      false
    )
  }, [])

  return (
    <div className="show-cmp">
      <div className="show-cmp-phoneType">
        <div
          onClick={() => {
            handleSetPhoneType("ios")
          }}
          className={localSetting.phoneType === "ios" ? "show-cmp-phoneType-active" : ""}
        >
          <AppleFilled style={{ fill: localSetting.phoneType === "ios" ? "#fff" : "#e07300" }} />
          ios
        </div>
        <div
          onClick={() => {
            handleSetPhoneType("android")
          }}
          className={localSetting.phoneType === "android" ? "show-cmp-phoneType-active" : ""}
        >
          <AndroidFilled style={{ fill: localSetting.phoneType === "android" ? "#fff" : "#e07300" }} />
          android
        </div>
      </div>
      <div className="show-cmp-box">
        <div className="show-cmp-title">{globalSetting.global.title}</div>
        <iframe id="qiframe" name="qiframe" title="qieditor" width="100%" height="100%" frameBorder="0" srcDoc={SData2Html(globalSetting, mainTree, Local2Html(localSetting))} />
      </div>
    </div>
  )
}

export default observer(ShowComponent)
