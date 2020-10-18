import React, { useState } from "react"
import { Menu, Modal, Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

import { UploadChangeParam } from "antd/lib/upload/interface"

interface ImgUploadModalProp {
  modalState: boolean
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const ImgUploadModal: React.FC<ImgUploadModalProp> = ({ modalState, setModalState }) => {
  type currentProp = "upload" | "qn"

  const [current, setCurrent] = useState<currentProp>("upload")
  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info: UploadChangeParam) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} 上传成功!`)
      } else if (status === "error") {
        message.error(`${info.file.name} 上传失败!`)
      }
    },
  }

  return (
    <Modal
      title="本地图片上传"
      visible={modalState}
      okText="好 的"
      cancelText="取 消"
      onOk={() => setModalState(false)}
      onCancel={() => setModalState(false)}
      width={600}
      className="image-upload-modal"
    >
      <div className="image-upload-modal-main">
        <Menu className="image-upload-modal-main-head" onClick={({ key }) => setCurrent(key as currentProp)} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="upload">图片上传</Menu.Item>
          <Menu.Item key="qn">七牛云配置</Menu.Item>
        </Menu>

        <div className="image-upload-modal-main-content">
          {current === "upload" && (
            <div>
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽一张或多张照片上传</p>
                <p className="ant-upload-hint">正在使用七牛云上传，请确认配置无误</p>
              </Upload.Dragger>
            </div>
          )}

          {current === "qn" && <div>1121</div>}
        </div>
      </div>
    </Modal>
  )
}

export default ImgUploadModal
