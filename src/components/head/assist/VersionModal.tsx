import React from "react"
import { Modal, Timeline } from "antd"
import { RocketOutlined } from "@ant-design/icons"
import versionUpInfo from "@/version.json"

interface VersionModalProp {
  modalState: boolean
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const VersionModal: React.FC<VersionModalProp> = ({ modalState, setModalState }) => {
  return (
    <Modal
      title="版本信息"
      visible={modalState}
      okText="关 闭"
      onOk={() => setModalState(false)}
      onCancel={() => setModalState(false)}
      width={450}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Timeline className="version-modal-cls">
        {versionUpInfo.versionInfo.map((v, i) => (
          <Timeline.Item key={i} dot={<RocketOutlined />}>
            <div className="version-info-item">
              <span>
                v{v.version}更新内容 <i>({v.upTime})</i>
              </span>
              <ul>
                {v.info.map((vinfo, j) => (
                  <li key={j}>{vinfo}</li>
                ))}
              </ul>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Modal>
  )
}

export default VersionModal
