import React from "react"
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"

import "./arrayConfig.less"
import { ParamArrayParamTypeProp } from "@/stores/data"

interface ArrayConfigCmpProps {
  item: ParamArrayParamTypeProp
  valueArray: ParamArrayParamTypeProp[]
}

const ArrayConfigCmp: React.FC<ArrayConfigCmpProps> = ({ item, valueArray }) => {
  return (
    <div className="arrayConfig-cls">
      {valueArray.map((value, i) => {
        return (
          <div className="arrayConfig-cls-item" key={i}>
            <div className="arrayConfig-cls-item-left">
              {Object.keys(value).map((v, j) => (
                <div className="arrayConfig-cls-item-param" key={j}>
                  {value[v].title},{value[v].type},{value[v].value}
                </div>
              ))}
            </div>
            <div className="arrayConfig-cls-item-right">
              <CloseCircleOutlined className="close-icon" />
            </div>
          </div>
        )
      })}
      <div>
        <PlusCircleOutlined />
      </div>
    </div>
  )
}
export default ArrayConfigCmp
