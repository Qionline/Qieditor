import React from "react"
import { Menu, Dropdown, message } from "antd"
import { observer } from "mobx-react-lite"
import html2canvasfrom from "html2canvas"

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
      try {
        setJson2Store(this.result as string)
        handleSetComponetSelectState(0)
        message.success("配置导入成功!")
      } catch (error) {
        message.error("配置导入失败，请检查上传文件类型是否正确!")
      }
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

  const handlePngDownload = () => {
    const iframeDom = (document.getElementById("qiframe") as HTMLIFrameElement).contentWindow
    if (!iframeDom) {
      message.error("图片导出失败！")
      return
    }
    const qiappDom = iframeDom.document.getElementsByTagName("body")[0]
    if (!qiappDom) {
      message.error("图片导出失败！")
      return
    }
    html2canvasfrom(qiappDom, {
      useCORS: true,
    }).then(canvas => {
      const base64image = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = base64image
      a.setAttribute("download", globalSetting.filename + ".png")
      a.click()
    })
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item filemenu-import-json">
          <input onChange={handleFiles} type="file" id="files" accept="application/JSON" />
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
        <span className="menu-item" onClick={handlePngDownload}>
          导出为图片
        </span>
      </Menu.Item>
      <Menu.Item key="3">
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
