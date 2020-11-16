import React from "react"
import { ParamArrayParamTypeProp } from "@/stores/data"

interface ArrayConfigCmpProps {
  item: ParamArrayParamTypeProp
  valueArray: ParamArrayParamTypeProp[]
}

const ArrayConfigCmp: React.FC<ArrayConfigCmpProps> = ({ item, valueArray }) => {
  return <div className="arrayConfig-cls">test</div>
}

export default ArrayConfigCmp
