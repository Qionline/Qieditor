import React from "react"
import { Menu, Dropdown } from "antd"
import { observer } from "mobx-react-lite"

import "./index.less"
import { useDataStore } from "@/stores"

const HeadComponent: React.FC = () => {
  const { handleSetGlobalSetting, handleSetMainTree, handleSetComponentsTree } = useDataStore()

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0] //获取读取的File对象
    if (!selectedFile) {
      return
    }
    const reader = new FileReader() //这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile) //读取文件的内容

    reader.onload = function () {
      console.log("读取结果：", this.result) //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
      let json = JSON.parse(this.result as string)
      handleSetGlobalSetting({
        filename: json.filename,
        global: {
          ...json.global,
        },
      })
      handleSetMainTree(json.main)
      handleSetComponentsTree(json.component)
    }
  }

  const fileMenu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item filemenu-import-json">
          <input
            onChange={e => {
              handleFiles(e)
            }}
            type="file"
            id="files"
          />
          导入配置文件
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <span className="menu-item">下载配置文件</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span className="menu-item">下载页面</span>
      </Menu.Item>
    </Menu>
  )

  const confMenu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item">全局css配置</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span className="menu-item">全局js配置</span>
      </Menu.Item>
    </Menu>
  )

  const helpMenu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item">关于</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="head-cmp">
      <div className="logo">
        <img src={require("@/images/logo.gif")} alt="" />
        Seditor
      </div>
      <Dropdown overlay={fileMenu} trigger={["click"]}>
        <span className="head-bar-item" onClick={e => e.preventDefault()}>
          文件
        </span>
      </Dropdown>
      <Dropdown overlay={confMenu} trigger={["click"]}>
        <span className="head-bar-item" onClick={e => e.preventDefault()}>
          配置项
        </span>
      </Dropdown>
      <Dropdown overlay={helpMenu} trigger={["click"]}>
        <span className="head-bar-item" onClick={e => e.preventDefault()}>
          帮助
        </span>
      </Dropdown>
    </div>
  )
}

export default observer(HeadComponent)
