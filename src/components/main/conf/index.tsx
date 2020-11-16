import React from "react"
import { Menu, Radio, Input, Divider, Button, Modal } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import { observer } from "mobx-react-lite"

import { MenuInfo } from "rc-menu/lib/interface"
import { RadioChangeEvent } from "antd/lib/radio/interface"
import { confMenuStateProp } from "@/stores/state"
import { ParamTypeProp } from "@/stores/data"

import "./index.less"
import { useDataStore, useStateStore } from "@/stores"
import ColorPicker from "@/components/main/conf/colorPicker"
import ArrayConfigCmp from "@/components/main/conf/arrayConfig"

interface CompConfItemProps {
  idx: number
  paramKey: string
  paramValue: ParamTypeProp
}

const CompConfItem: React.FC<CompConfItemProps> = ({ idx, paramKey, paramValue }) => {
  const { handleSetParamValue } = useDataStore()
  const handleChangedTextParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetParamValue(idx, e.target.value, paramKey)
  }
  const handleChangedRadioParams = (e: RadioChangeEvent) => {
    handleSetParamValue(idx, e.target.value, paramKey)
  }
  const handleChangeColor = (e: string) => {
    handleSetParamValue(idx, e, paramKey)
  }

  if (paramValue.type === "text") {
    return (
      <div>
        <Input value={paramValue.value} onChange={handleChangedTextParams} />
      </div>
    )
  } else if (paramValue.type === "radio") {
    return (
      <div>
        <Radio.Group onChange={handleChangedRadioParams} value={paramValue.value}>
          {paramValue.radioArr.map((v, i) => (
            <Radio key={i} value={v}>
              {v}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    )
  } else if (paramValue.type === "color") {
    return (
      <div>
        <ColorPicker color={paramValue.value} onChangeComplete={handleChangeColor} />
      </div>
    )
  } else if (paramValue.type === "array") {
    return (
      <div>
        <ArrayConfigCmp item={paramValue.item} valueArray={paramValue.value} />
      </div>
    )
  }

  return <div>配置文件有误，参数类型不存在</div>
}

const ConfComponent: React.FC = () => {
  const { componetSelectState, handleSetComponetSelectState, confMenuState, handleSetConfMenuState } = useStateStore()
  const { globalSetting, mainTree, handleSetGlobalSetting, handleSetMainTree } = useDataStore()

  const handleCheckedMenu = (e: MenuInfo) => {
    handleSetConfMenuState(e.key as confMenuStateProp)
  }

  const handleChangeFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = globalSetting
    res.filename = e.target.value
    handleSetGlobalSetting(res)
  }
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = globalSetting
    res.global.title = e.target.value
    handleSetGlobalSetting(res)
  }
  const handleChangeDirection = (e: RadioChangeEvent) => {
    const res = globalSetting
    res.global.direction = e.target.value
    handleSetGlobalSetting(res)
  }
  const handleChangeBgColor = (color: string) => {
    const res = globalSetting
    res.global.bodyColor = color
    handleSetGlobalSetting(res)
  }

  const handleDelComponent = () => {
    Modal.confirm({
      title: "组件删除",
      content: `确定要删除组件 "${mainTree[componetSelectState].name}(${componetSelectState})" 吗`,
      icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      okText: "确 定",
      okType: "danger",
      cancelText: "取 消",
      style: { top: 250 },
      onOk() {
        const tree = [...mainTree]
        tree.splice(componetSelectState, 1)
        if (!tree.length) handleSetConfMenuState("global")
        if (tree.length === componetSelectState) handleSetComponetSelectState(componetSelectState - 1)
        handleSetMainTree(tree)
      },
    })
  }

  return (
    <div className="conf-cmp">
      <Menu onClick={handleCheckedMenu} selectedKeys={[confMenuState]} mode="horizontal">
        <Menu.Item key="global">全局配置</Menu.Item>
        <Menu.Item disabled={!mainTree.length} key="comp">
          组件配置
        </Menu.Item>
      </Menu>

      <div className="conf-main">
        {confMenuState === "global" && (
          <div className="config-common conf-global-page">
            <div className="config-common-item">
              <Divider orientation="left">导出文件名</Divider>
              <div className="ctx">
                <Input value={globalSetting.filename} onChange={handleChangeFilename} />
              </div>
            </div>
            <div className="config-common-item">
              <Divider orientation="left">页面标题</Divider>
              <div className="ctx">
                <Input value={globalSetting.global.title} onChange={handleChangeTitle} />
              </div>
            </div>
            <div className="config-common-item">
              <Divider orientation="left">阅读方向</Divider>
              <div className="ctx">
                <Radio.Group onChange={handleChangeDirection} value={globalSetting.global.direction}>
                  <Radio value="ltr">从左往右</Radio>
                  <Radio value="rtl">从右往左</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="config-common-item">
              <Divider orientation="left">背景颜色</Divider>
              <div className="ctx">
                <ColorPicker color={globalSetting.global.bodyColor} onChangeComplete={handleChangeBgColor} />
              </div>
            </div>

            {Object.keys(globalSetting.global.params).map((v, i) => {
              const el = globalSetting.global.params[v]
              return (
                <div className="config-common-item" key={i}>
                  <Divider orientation="left">{el.title}</Divider>
                  <CompConfItem idx={-1} paramKey={v} paramValue={{ ...el }} />
                </div>
              )
            })}
          </div>
        )}

        {confMenuState === "comp" && (
          <div className="config-common conf-comp-page">
            <span className="title">
              {mainTree[componetSelectState].name}({componetSelectState})
            </span>
            <div className="conf-comp-page-container">
              {Object.keys(mainTree[componetSelectState].params).length === 0 ? (
                <div className="no-conf">该组件无配置项</div>
              ) : (
                Object.keys(mainTree[componetSelectState].params).map((v, i) => {
                  const el = mainTree[componetSelectState].params[v]
                  return (
                    <div className="config-common-item" key={i}>
                      <Divider orientation="left">{el.title}</Divider>
                      <CompConfItem idx={componetSelectState} paramKey={v} paramValue={{ ...el }} />
                    </div>
                  )
                })
              )}
            </div>
            <div className="conf-comp-page-btnGroup">
              <Button shape="round" type="primary" danger onClick={handleDelComponent}>
                删除当前组件
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(ConfComponent)
