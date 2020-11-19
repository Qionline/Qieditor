import React, { useState, useEffect } from "react"
import { Menu, Dropdown } from "antd"

import "./index.less"
import { setVersionStorage, getVersionStorage } from "@/core/feature/localDataStorage"
import AboutModal from "./AboutModal"
import VersionModal from "./VersionModal"

const AssistMenu: React.FC = () => {
  const [aboutModalState, setAboutModalState] = useState(false)
  const [VersionModalState, setVersionModalState] = useState(false)

  useEffect(() => {
    if (!getVersionStorage()) {
      setVersionModalState(true)
    }
    setVersionStorage()
  }, [])

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item" onClick={() => setAboutModalState(true)}>
          关于
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span className="menu-item" onClick={() => setVersionModalState(true)}>
          版本信息
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <span className="head-bar-item" onClick={e => e.preventDefault()}>
          帮助
        </span>
      </Dropdown>

      <AboutModal modalState={aboutModalState} setModalState={setAboutModalState} />
      <VersionModal modalState={VersionModalState} setModalState={setVersionModalState} />
    </>
  )
}

export default AssistMenu
