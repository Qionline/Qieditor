import React, { useState } from "react"
import { Menu, Dropdown, Modal, Button } from "antd"

import "./index.less"

const AssistMenu: React.FC = () => {
  const [aboutModalState, setAboutModalState] = useState(false)

  const showModal = () => {
    setAboutModalState(true)
  }
  const handleCancel = () => {
    setAboutModalState(false)
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="menu-item" onClick={showModal}>
          关于
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

      <Modal title="关于" visible={aboutModalState} okText="好 的" onOk={handleCancel} onCancel={handleCancel} width={500} cancelButtonProps={{ style: { display: "none" } }}>
        <div className="about-title">
          <span>Qieditor</span>
          <div>
            <a href="https://github.com/betterTisen/Qieditor">
              <img src="https://badgen.net/github/stars/betterTisen/Qieditor?color=orange" alt="stars" />
            </a>
            <a href="https://github.com/betterTisen/Qieditor/issues">
              <img src="https://badgen.net/github/issues/betterTisen/Qieditor?color=orange" alt="issues" />
            </a>
          </div>
        </div>

        <p>Qieditor是一款由开发者编写配置页面、运营通过可视化操作快速生成页面的效率工具</p>

        <p>
          如果你在使用过程中有任何问题(或建议)欢迎点击
          <Button type="link" href="https://github.com/betterTisen/Qieditor/issues">
            Issues
          </Button>
          与我交流。
        </p>
        <p>
          当然如果你喜欢该工具，也欢迎通过
          <Button type="link" href="https://github.com/betterTisen/Qieditor">
            Github
          </Button>
          点个 🌟～
        </p>
      </Modal>
    </>
  )
}

export default AssistMenu
