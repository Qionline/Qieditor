import React, { useState } from "react"
import { Menu, Button } from "antd"
import { observer } from "mobx-react-lite"
import { ColorResult, TwitterPicker } from "react-color"

import { MenuInfo } from "rc-menu/lib/interface"

import "./index.less"
import { useDataStore } from "@/stores"

const ConfComponent: React.FC = () => {
  const { globalSetting, mainTree, componentsTree, handleSetGlobalSetting, handleSetMainTree, handleSetComponentsTree } = useDataStore()
  const [confMenuState, setConfMenuState] = useState("global")

  const handleCheckedMenu = (e: MenuInfo) => {
    setConfMenuState(e.key as string)
  }

  const handleChangeBgColor = (color: ColorResult) => {
    const res = globalSetting
    res.global.bodyColor = color.hex
    handleSetGlobalSetting(res)
  }

  const handleUpdateConfig = () => {
    console.log(1)
  }

  return (
    <div className="conf-cmp">
      <Menu onClick={handleCheckedMenu} selectedKeys={[confMenuState]} mode="horizontal">
        <Menu.Item key="global">全局配置</Menu.Item>
        <Menu.Item key="comp">组件配置</Menu.Item>
      </Menu>

      <div className="conf-main">
        {confMenuState === "global" && (
          <div className="config-common conf-global-page">
            <div>
              <span className="title">
                <TwitterPicker color={globalSetting.global.bodyColor} onChangeComplete={handleChangeBgColor} />
              </span>
            </div>
            <div></div>
            <div></div>
          </div>
        )}

        {confMenuState === "comp" && <div className="config-common conf-comp-page">2</div>}

        <Button className="conf-save-btn" type="primary" onClick={handleUpdateConfig}>
          保存 / 更新配置
        </Button>
      </div>
    </div>
  )
}

export default observer(ConfComponent)
