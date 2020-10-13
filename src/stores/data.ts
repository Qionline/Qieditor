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
export interface componentsTreePramasProp {
  [propName: string]: {
    type: "text" | "textarea" | "link"
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

  @observable mainTree: componentsTreeProp[] = [...mainTutorialConf]

  @observable componentsTree: componentsTreeProp[] = [...componentsTutorialConf]

  @action.bound handleSetGlobalSetting(globalSetting: globalSettingProp) {
    this.globalSetting = globalSetting
  }

  @action.bound handleSetMainTree(mainTree: componentsTreeProp[]) {
    this.mainTree = [...mainTree]
    setLocalDataStorage()
  }

  @action.bound handleSetComponentsTree(componentsTree: componentsTreeProp[]) {
    this.componentsTree = componentsTree
    setLocalDataStorage()
  }
}

export const DATA_KEY = "dataStore"
