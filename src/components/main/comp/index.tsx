import React from "react"
import { observer } from "mobx-react-lite"
import "./index.less"

const CompComponent: React.FC = () => {
  return <div className="">comp</div>
}

export default observer(CompComponent)
