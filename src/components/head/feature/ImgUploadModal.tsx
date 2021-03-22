import React, { useState, useEffect } from "react"
import { Menu, Modal, Upload, Input, Button, Select, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

import { RcCustomRequestOptions } from "antd/lib/upload/interface"

import { STORAGE_NAME } from "@/core/feature/localDataStorage"
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
    const qnConfigString = localStorage.getItem(STORAGE_NAME)
    if (!qnConfigString) {
      message.warn("上传图片前请先完成配置修改!")
      return
    }
    const qnConfig = JSON.parse(qnConfigString).global?.imgUpConfig
    if (!qnConfig || qnConfig.type !== "qn") {
      setCurrent("qn")
      message.warn("上传图片前请先完成配置修改并保存!")
      return
    }
    setQnAccessKey(qnConfig.accessKey)
    setQnSecretKey(qnConfig.secretKey)
    setQnImgUrl(qnConfig.imgUrl)
    setQnScope(qnConfig.qnScope)
    setQnUpRegion(qnConfig.region)
  }, [modalState])

  const handleCloseModal = () => {
    setModalState(false)
    setQnAccessKey("")
    setQnSecretKey("")
    setQnImgUrl("")
    setQnScope("")
    setQnUpRegion("z0")
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
    const qiConfigString = localStorage.getItem(STORAGE_NAME)
    if (!qiConfigString) {
      message.error(`配置保存失败，请先上传可用的模板文件！`)
      return
    }
    const qiConfig = JSON.parse(qiConfigString)
    qiConfig.global["imgUpConfig"] = {
      ...qnConfig,
    }
    localStorage.setItem(STORAGE_NAME, JSON.stringify(qiConfig))
    message.success(`配置保存成功！`)
  }

  // 七牛云图片上传
  const uploadProps = {
    multiple: true,
    customRequest(option: RcCustomRequestOptions) {
      const config = localStorage.getItem(STORAGE_NAME)
      if (!config) return
      const QieditorUpImageConfig = JSON.parse(config).global?.imgUpConfig
      if (!QieditorUpImageConfig || QieditorUpImageConfig.type !== "qn") {
        message.error(`请确保配置文件填写正确！`)
        return
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
      onOk={() => handleCloseModal()}
      onCancel={() => handleCloseModal()}
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
                <Input.Password visibilityToggle={false} onChange={e => setQnAccessKey(e.target.value)} value={qnAccessKey} name="accessKey" />
              </FormLabel>
              <FormLabel title="secretKey:">
                <Input.Password visibilityToggle={false} onChange={e => setQnSecretKey(e.target.value)} value={qnSecretKey} name="secretKey" />
              </FormLabel>
              <FormLabel title="图片路径:">
                <Input onChange={e => setQnImgUrl(e.target.value)} value={qnImgUrl} name="imgUrl" />
              </FormLabel>
              <FormLabel title="空间:">
                <Input onChange={e => setQnScope(e.target.value)} value={qnScope} name="qnScope" />
              </FormLabel>

              <div className="qn-form-bottom">
                <FormLabel title="存储地区:">
                  <Select defaultValue={qnUpRegion} style={{ width: 150 }} onChange={e => setQnUpRegion(e)}>
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
