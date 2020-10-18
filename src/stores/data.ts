import { action, observable } from "mobx"

import { setLocalDataStorage } from "@/core/feature/localDataStorage"
import { globalTutorialConf, mainTutorialConf, componentsTutorialConf } from "@/tutorial"

export interface globalSettingProp {
  filename: string
  global: {
    title: string
    direction: "ltr" | "rtl"
    bodyColor: string
    css: string
    js: string
  }
}
export type ParamType = "text" | "textarea" | "link"
export interface componentsTreePramasProp {
  [propName: string]: {
    type: ParamType
    title: string
    value: string
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
}

export const DATA_KEY = "dataStore"
