import { action, observable } from "mobx"

import { setLocalDataStorage } from "@/core/feature/localDataStorage"
import { globalTutorialConf, mainTutorialConf, componentsTutorialConf } from "@/tutorial"

export interface ParamTextType {
  type: "text"
  title: string
  value: string
}
export interface ParamRadioType {
  type: "radio"
  title: string
  value: string
  radioArr: string[]
}
export interface ParamColorType {
  type: "color"
  title: string
  value: string
}
export interface ParamArrayType {
  type: "array"
  title: string
  template: string
  item: ParamArrayParamTypeProp
  value: ParamArrayParamTypeProp[]
}
export type ParamArrayTypeProp = ParamTextType | ParamRadioType | ParamColorType
export type ParamTypeProp = ParamTextType | ParamRadioType | ParamColorType | ParamArrayType
export interface ParamArrayParamTypeProp {
  [propName: string]: ParamArrayTypeProp
}
export interface componentsTreePramasProp {
  [propName: string]: ParamTypeProp
}
export interface qnUploadConfigProp {
  type: "qn"
  accessKey: string
  secretKey: string
  imgUrl: string
  qnScope: string
  region: "z0" | "z1" | "z2" | "na0" | "as0"
}
export interface globalSettingProp {
  filename: string
  global: {
    title: string
    direction: "ltr" | "rtl"
    bodyColor: string
    css: string
    js: string
    externalCss?: string[]
    externalJs?: string[]
    params: componentsTreePramasProp
    imgUpConfig?: qnUploadConfigProp
  }
}

export interface componentsTreeProp {
  id: number
  name: string
  params: componentsTreePramasProp
  htmlstr: string
}

export class DataStore {
  @observable globalSetting: globalSettingProp = {
    ...globalTutorialConf,
  }
  @action.bound handleSetGlobalSetting(globalSetting: globalSettingProp) {
    this.globalSetting = globalSetting
    setLocalDataStorage()
  }

  @observable mainTree: componentsTreeProp[] = [...mainTutorialConf]
  @action.bound handleSetMainTree(mainTree: componentsTreeProp[]) {
    this.mainTree = [...mainTree]
    setLocalDataStorage()
  }

  @observable componentsTree: componentsTreeProp[] = [...componentsTutorialConf]
  @action.bound handleSetComponentsTree(componentsTree: componentsTreeProp[]) {
    this.componentsTree = componentsTree
    setLocalDataStorage()
  }

  @action.bound handleSetParamValue(idx: number, value: string | ParamArrayParamTypeProp[], paramKey: string) {
    // idx === -1 为global
    if (idx === -1) {
      this.globalSetting.global.params[paramKey].value = value
    } else {
      this.mainTree[idx].params[paramKey].value = value
    }
    setLocalDataStorage()
  }
}

export const DATA_KEY = "dataStore"
