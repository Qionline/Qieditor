import React from "react"
import { Modal, Button } from "antd"

interface AboutModalProp {
  modalState: boolean
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const AboutModal: React.FC<AboutModalProp> = ({ modalState, setModalState }) => {
  return (
    <Modal
      title="关于"
      visible={modalState}
      okText="好 的"
      onOk={() => setModalState(false)}
      onCancel={() => setModalState(false)}
      width={500}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="about-title">
        <span>Qieditor</span>
        <div>
          <a href="https://github.com/Qionline/Qieditor">
            <img src="https://badgen.net/github/stars/Qionline/Qieditor?color=orange" alt="stars" />
          </a>
          <a href="https://github.com/Qionline/Qieditor/issues/new/choose">
            <img src="https://badgen.net/github/issues/Qionline/Qieditor?color=orange" alt="issues" />
          </a>
        </div>
      </div>

      <p>Qieditor是一款由开发者编写配置页面、由运营通过可视化操作快速生成页面的效率工具</p>

      <p>
        如果你在使用过程中有任何问题(或建议)欢迎点击
        <Button type="link" href="https://github.com/Qionline/Qieditor/issues/new/choose">
          Issues
        </Button>
        与我交流。
      </p>
      <p>
        当然如果你喜欢该工具，也欢迎通过
        <Button type="link" href="https://github.com/Qionline/Qieditor">
          Github
        </Button>
        点个 🌟～
      </p>
    </Modal>
  )
}

export default AboutModal
