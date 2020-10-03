import React from "react"
import { Menu, Dropdown } from "antd"
import { observer } from "mobx-react-lite"

import { SAst2Html } from "@/core/ast2file"
import { useDataStore, useStateStore } from "@/stores"

const FileMenu: React.FC = () => {
  const { handleSetComponetSelectState } = useStateStore()
  const { globalSetting, mainTree, componentsTree, handleSetGlobalSetting, handleSetMainTree, handleSetComponentsTree } = useDataStore()

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) {
      return
    }
    const reader = new FileReader()
    reader.readAsText(selectedFile)
    reader.onload = function () {
      let json = JSON.parse(this.result as string)
      handleSetGlobalSetting({
        filename: json.filename,
        global: {
          ...json.global,
        },
      })
      handleSetMainTree(json.main)
      handleSetComponentsTree(json.component)
      handleSetComponetSelectState(0)
    }
  }

  const handleHtmlDownload = () => {
    const content = SAst2Html(globalSetting, mainTree)
    const filename = `${globalSetting.filename}.html`
    const eleLink = document.createElement("a")
    eleLink.download = filename
    eleLink.style.display = "none"
    const blob = new Blob([content])
    eleLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }

  const handleJsonDownload = () => {
    const content = JSON.stringify({
      ...globalSetting,
      main: [...mainTree],
      component: [...componentsTree],
    })
    const filename = `${globalSetting.filename}.json`
    const eleLink = document.createElement("a")
    eleLink.download = filename
    eleLink.style.display = "none"
    const blob = new Blob([content])
    eleLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item filemenu-import-json">
          <input onChange={handleFiles} type="file" id="files" />
          导入配置文件
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <span className="menu-item" onClick={handleJsonDownload}>
          导出配置文件
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span className="menu-item" onClick={handleHtmlDownload}>
          下载页面
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <span className="head-bar-item" onClick={e => e.preventDefault()}>
        文件
      </span>
    </Dropdown>
  )
}

export default observer(FileMenu)
