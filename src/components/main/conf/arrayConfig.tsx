import React from "react"
import { Input, Radio, message } from "antd"
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons"

import "./arrayConfig.less"
import { ParamArrayParamTypeProp } from "@/stores/data"
import ColorPicker from "@/components/main/conf/colorPicker"

interface ArrayConfigItemCmpProps {
  idx: number
  paramKey: string
  valueArray: ParamArrayParamTypeProp[]
  onChangeComplete: (e: ParamArrayParamTypeProp[]) => void
}
const ArrayConfigItemCmp: React.FC<ArrayConfigItemCmpProps> = ({ idx, paramKey, valueArray, onChangeComplete }) => {
  const paramValue = valueArray[idx][paramKey]

  const handleChangedParams = (str: string) => {
    valueArray[idx][paramKey].value = str
    onChangeComplete(valueArray)
  }

  if (paramValue.type === "text") {
    return (
      <div>
        <Input onChange={e => handleChangedParams(e.target.value)} value={valueArray[idx][paramKey].value} />
      </div>
    )
  } else if (paramValue.type === "radio") {
    return (
      <div>
        <Radio.Group onChange={e => handleChangedParams(e.target.value)} value={valueArray[idx][paramKey].value}>
          {paramValue.radioArr.map((v, i) => (
            <Radio key={i} value={v}>
              {v}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    )
  } else if (paramValue.type === "color") {
    return (
      <div>
        <ColorPicker color={valueArray[idx][paramKey].value} onChangeComplete={e => handleChangedParams(e)} />
      </div>
    )
  }
  return <div>配置文件有误，参数类型不存在</div>
}

interface ArrayConfigCmpProps {
  item: ParamArrayParamTypeProp
  valueArray: ParamArrayParamTypeProp[]
  onChangeComplete: (array: any) => void
}

const ArrayConfigCmp: React.FC<ArrayConfigCmpProps> = ({ item, valueArray, onChangeComplete }) => {
  const handleAddItem = () => {
    onChangeComplete([...valueArray, item])
    message.success("添加成功!")
  }
  const handleDeleteItem = (i: number) => {
    valueArray.splice(i, 1)
    onChangeComplete([...valueArray])
    message.error("删除成功!")
  }

  return (
    <div className="arrayConfig-cls">
      {valueArray.map((value, i) => {
        return (
          <div className="arrayConfig-cls-item" key={i}>
            <div className="arrayConfig-cls-item-left">
              {Object.keys(value).length === 0 ? (
                <div className="item-empty">该数组项无可配置项</div>
              ) : (
                Object.keys(value).map((v, j) => (
                  <div className="arrayConfig-cls-item-param" key={j}>
                    <span className="arrayConfig-cls-item-param-title">{value[v].title}:</span>
                    <ArrayConfigItemCmp idx={i} paramKey={v} valueArray={[...valueArray]} onChangeComplete={onChangeComplete} />
                  </div>
                ))
              )}
            </div>
            <div className="arrayConfig-cls-item-right">
              <CloseCircleOutlined onClick={() => handleDeleteItem(i)} className="close-icon" />
            </div>
          </div>
        )
      })}
      <div onClick={handleAddItem} className="arrayConfig-cls-addBtn">
        <PlusOutlined />
      </div>
    </div>
  )
}
export default ArrayConfigCmp
