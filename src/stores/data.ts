//  ./src/stores/todo.ts
import { action, observable } from "mobx"

export interface globalSettingProp {
  filename: string
  global: {
    title: string
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
  name: string
  params: componentsTreePramasProp
  htmlstr: string
}

export class DataStore {
  @observable globalSetting: globalSettingProp = {
    filename: "Seditor",
    global: {
      title: "Seditor Page",
      bodyColor: "#eee",
      css: "",
      js: "",
    },
  }

  @observable mainTree: string[] = []

  @observable componentsTree: componentsTreeProp[] = []

  @action.bound handleSetGlobalSetting(globalSetting: globalSettingProp) {
    this.globalSetting = globalSetting
  }

  @action.bound handleSetMainTree(mainTree: string[]) {
    this.mainTree = [...mainTree]
  }

  @action.bound handleSetComponentsTree(componentsTree: componentsTreeProp[]) {
    this.componentsTree = componentsTree
  }
}

export const DATA_KEY = "dataStore"
