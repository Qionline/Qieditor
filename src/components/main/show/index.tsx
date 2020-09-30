import React from "react"
import { observer } from "mobx-react-lite"

import "./index.less"
import { useDataStore } from "@/stores"
import { SAst2Html } from "@/core/ast2file"

const ShowComponent: React.FC = () => {
  const { globalSetting, mainTree } = useDataStore()

  return (
    <div className="show-cmp">
      <div className="show-page-title">{globalSetting.global.title}</div>
      <div className="show-page-box">
        <iframe title="a" width="100%" height="100%" frameBorder="0" srcDoc={SAst2Html(globalSetting, mainTree)} />
      </div>
    </div>
  )
}

export default observer(ShowComponent)
