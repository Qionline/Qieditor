import React, { useState, useEffect } from "react"
import { Menu, Modal, Upload, Input, Button, Select, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

import { RcCustomRequestOptions } from "antd/lib/upload/interface"

import { getQnToken, getQnRegion } from "@/utils/qiniu"

interface FormLabelProp {
  title: string
}
const FormLabel: React.FC<FormLabelProp> = ({ title, children }) => {
  return (
    <div className="form-label">
      <span className="form-label-title">{title}</span>
      <div className="form-label-main">{children}</div>
    </div>
  )
}

interface ImgUploadModalProp {
  modalState: boolean
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}
const ImgUploadModal: React.FC<ImgUploadModalProp> = ({ modalState, setModalState }) => {
  type currentProp = "upload" | "qn"
  const [current, setCurrent] = useState<currentProp>("upload")

  const [qnAccessKey, setQnAccessKey] = useState("")
  const [qnSecretKey, setQnSecretKey] = useState("")
  const [qnImgUrl, setQnImgUrl] = useState("")
  const [qnScope, setQnScope] = useState("")
  const [qnUpRegion, setQnUpRegion] = useState("z0")

  useEffect(() => {
    if (!modalState) return
    const qnConfigString = localStorage.getItem("QieditorUpImageConfig")
    if (!qnConfigString) {
      message.warn("上传图片前请先完成配置修改!")
      return
    }
    const qnConfig = JSON.parse(qnConfigString)
    if (qnConfig.type !== "qn") return
    setQnAccessKey(qnConfig.accessKey)
    setQnSecretKey(qnConfig.secretKey)
    setQnImgUrl(qnConfig.imgUrl)
    setQnScope(qnConfig.qnScope)
    setQnUpRegion(qnConfig.region)
  }, [modalState])

  const handleQnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "accessKey":
        setQnAccessKey(e.target.value)
        break
      case "secretKey":
        setQnSecretKey(e.target.value)
        break
      case "imgUrl":
        setQnImgUrl(e.target.value)
        break
      case "qnScope":
        setQnScope(e.target.value)
        break
    }
  }
  const handleQnSelectChange = (e: string) => {
    setQnUpRegion(e)
  }
  const handleQnUpdate = () => {
    const qnConfig = {
      type: "qn",
      accessKey: qnAccessKey,
      secretKey: qnSecretKey,
      imgUrl: qnImgUrl,
      qnScope: qnScope,
      region: qnUpRegion,
    }
    localStorage.setItem("QieditorUpImageConfig", JSON.stringify(qnConfig))
    message.success(`配置保存成功！`)
  }

  const uploadProps = {
    multiple: true,
    customRequest(option: RcCustomRequestOptions) {
      const config = localStorage.getItem("QieditorUpImageConfig")
      if (!config) return
      const QieditorUpImageConfig = {
        ...JSON.parse(config),
      }
      const file = option.file
      const key = `${qnImgUrl}${option.file.name}`
      const token = getQnToken(QieditorUpImageConfig.accessKey, QieditorUpImageConfig.secretKey, QieditorUpImageConfig.qnScope)
      const xhr = new XMLHttpRequest()
      xhr.open("POST", getQnRegion[QieditorUpImageConfig.region as "z0" | "z1" | "z2" | "na0" | "as0"], true)
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            const percentComplete = Math.round((evt.loaded * 100) / evt.total)
            option.onProgress({ percent: percentComplete }, file)
          }
        },
        false
      )
      xhr.onreadystatechange = function (response) {
        if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText !== "") {
          option.onSuccess(response, file)
          message.success(`${file.name} 上传成功!`)
        } else if (xhr.status !== 200) {
          option.onError(new Error(xhr.responseText))
        }
      }
      const formData = new FormData()
      formData.append("file", file)
      formData.append("token", token)
      formData.append("key", key)
      formData.append("fname", file.name)
      xhr.send(formData)
    },
  }

  return (
    <Modal
      title="本地图片上传"
      visible={modalState}
      okText="关闭"
      onOk={() => setModalState(false)}
      onCancel={() => setModalState(false)}
      width={600}
      className="image-upload-modal"
      cancelButtonProps={{ style: { display: "none" } }}
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

          {current === "qn" && (
            <div className="qn-form">
              <FormLabel title="accessKey:">
                <Input.Password visibilityToggle={false} onChange={e => handleQnInputChange(e)} value={qnAccessKey} name="accessKey" />
              </FormLabel>
              <FormLabel title="secretKey:">
                <Input.Password visibilityToggle={false} onChange={e => handleQnInputChange(e)} value={qnSecretKey} name="secretKey" />
              </FormLabel>
              <FormLabel title="图片路径:">
                <Input onChange={e => handleQnInputChange(e)} value={qnImgUrl} name="imgUrl" />
              </FormLabel>
              <FormLabel title="空间:">
                <Input onChange={e => handleQnInputChange(e)} value={qnScope} name="qnScope" />
              </FormLabel>

              <div className="qn-form-bottom">
                <FormLabel title="存储地区:">
                  <Select defaultValue={qnUpRegion} style={{ width: 150 }} onChange={e => handleQnSelectChange(e)}>
                    <Select.Option value="z0">华东</Select.Option>
                    <Select.Option value="z1">华北</Select.Option>
                    <Select.Option value="z2">华南</Select.Option>
                    <Select.Option value="na0">北美</Select.Option>
                    <Select.Option value="as0">东南亚</Select.Option>
                  </Select>
                </FormLabel>
                <Button onClick={handleQnUpdate}>更新配置</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ImgUploadModal
