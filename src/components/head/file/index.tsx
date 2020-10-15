import React from "react"
import { Menu, Dropdown } from "antd"
import { observer } from "mobx-react-lite"

import { setJson2Store, setJson2String } from "@/utils/setJson"
import { SData2Html } from "@/core/data2html"
import { useDataStore, useStateStore } from "@/stores"

const FileMenu: React.FC = () => {
  const { handleSetComponetSelectState } = useStateStore()
  const { globalSetting, mainTree } = useDataStore()

  const handleFileDownload = (content: string, type: string) => {
    const filename = `${globalSetting.filename}.${type}`
    const eleLink = document.createElement("a")
    eleLink.download = filename
    eleLink.style.display = "none"
    const blob = new Blob([content])
    eleLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) {
      return
    }
    const reader = new FileReader()
    reader.readAsText(selectedFile)
    reader.onload = function () {
      setJson2Store(this.result as string)
      handleSetComponetSelectState(0)
    }
    e.target.value = ""
  }

  const handleHtmlDownload = () => {
    const content = SData2Html(globalSetting, mainTree)
    handleFileDownload(content, "html")
  }

  const handleJsonDownload = () => {
    const content = setJson2String()
    handleFileDownload(content, "json")
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
