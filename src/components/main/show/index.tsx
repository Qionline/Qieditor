import React from "react"
import { observer } from "mobx-react-lite"
import "./index.less"

const ShowComponent: React.FC = () => {
  return (
    <div className="show-cmp">
      <div className="show-page-title">1</div>
      <div className="show-page-box">
        <iframe title="a" width="100%" height="99%" frameBorder="0" srcDoc={"test"} />
      </div>
    </div>
  )
}

export default observer(ShowComponent)
