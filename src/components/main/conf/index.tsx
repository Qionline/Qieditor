import React, { useState } from "react"
import { Menu, Radio, Input, Divider } from "antd"
import { observer } from "mobx-react-lite"
import { ColorResult, TwitterPicker } from "react-color"

import { MenuInfo } from "rc-menu/lib/interface"
import { RadioChangeEvent } from "antd/lib/radio/interface"

import "./index.less"
import { useDataStore, useStateStore } from "@/stores"

interface CompConfItemProps {
  idx: string
  type: "text" | "link" | "textarea"
  value: string
}

const CompConfItem: React.FC<CompConfItemProps> = ({ idx, type, value }) => {
  const { componetSelectState } = useStateStore()
  const { mainTree, handleSetMainTree } = useDataStore()

  const handleChangedTextParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = [...mainTree]
    res[componetSelectState].params[idx].value = e.target.value
    handleSetMainTree(res)
  }

  if (type === "text") {
    return (
      <div>
        <Input value={mainTree[componetSelectState].params[idx].value} onChange={handleChangedTextParams} />
      </div>
    )
  }
  return <div>配置文件有误，参数类型不存在</div>
}

const ConfComponent: React.FC = () => {
  const { componetSelectState } = useStateStore()
  const { globalSetting, mainTree, handleSetGlobalSetting } = useDataStore()

  const [confMenuState, setConfMenuState] = useState("global")

  const handleCheckedMenu = (e: MenuInfo) => {
    setConfMenuState(e.key as string)
  }

  const handleChangeFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = globalSetting
    res.filename = e.target.value
    handleSetGlobalSetting(res)
  }
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = globalSetting
    res.global.title = e.target.value
    handleSetGlobalSetting(res)
  }
  const handleChangeDirection = (e: RadioChangeEvent) => {
    const res = globalSetting
    res.global.direction = e.target.value
    handleSetGlobalSetting(res)
  }
  const handleChangeBgColor = (color: ColorResult) => {
    const res = globalSetting
    res.global.bodyColor = color.hex
    handleSetGlobalSetting(res)
  }

  return (
    <div className="conf-cmp">
      <Menu onClick={handleCheckedMenu} selectedKeys={[confMenuState]} mode="horizontal">
        <Menu.Item key="global">全局配置</Menu.Item>
        <Menu.Item disabled={!mainTree.length} key="comp">
          组件配置
        </Menu.Item>
      </Menu>

      <div className="conf-main">
        {confMenuState === "global" && (
          <div className="config-common">
            <div className="config-common-item">
              <Divider orientation="left">导出文件名</Divider>
              <div className="ctx">
                <Input value={globalSetting.filename} onChange={handleChangeFilename} />
              </div>
            </div>
            <div className="config-common-item">
              <Divider orientation="left">页面标题</Divider>
              <div className="ctx">
                <Input value={globalSetting.global.title} onChange={handleChangeTitle} />
              </div>
            </div>
            <div className="config-common-item">
              <Divider orientation="left">阅读方向</Divider>
              <div className="ctx">
                <Radio.Group onChange={handleChangeDirection} value={globalSetting.global.direction}>
                  <Radio value="ltr">从左往右</Radio>
                  <Radio value="rtl">从右往左</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="config-common-item">
              <Divider orientation="left">背景颜色</Divider>
              <div className="ctx">
                <TwitterPicker triangle="hide" color={globalSetting.global.bodyColor} onChangeComplete={handleChangeBgColor} />
              </div>
            </div>
          </div>
        )}

        {confMenuState === "comp" && (
          <div className="config-common conf-comp-page">
            <span className="title">
              {mainTree[componetSelectState].name}({componetSelectState})
            </span>
            {Object.keys(mainTree[componetSelectState].params).length === 0 ? (
              <div className="no-conf">该组件无配置项</div>
            ) : (
              Object.keys(mainTree[componetSelectState].params).map((v, i) => {
                const el = mainTree[componetSelectState].params[v]
                return (
                  <div className="config-common-item" key={i}>
                    <Divider orientation="left">{el.title}</Divider>
                    <CompConfItem idx={v} type={el.type} value={el.value} />
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(ConfComponent)
