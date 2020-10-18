import React, { useState } from "react"
import { Menu, Dropdown } from "antd"

import "./index.less"
import ImgUploadModal from "./ImgUploadModal"

const FeatureMenu: React.FC = () => {
  const [featureModalState, setFeatureModalState] = useState(false)

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item" onClick={() => setFeatureModalState(true)}>
          图片上传
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <span className="head-bar-item" onClick={e => e.preventDefault()}>
          功能
        </span>
      </Dropdown>

      <ImgUploadModal modalState={featureModalState} setModalState={setFeatureModalState} />
    </>
  )
}

export default FeatureMenu
