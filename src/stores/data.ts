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
  id: number
  name: string
  params: componentsTreePramasProp
  htmlstr: string
}

export class DataStore {
  @observable globalSetting: globalSettingProp = {
    filename: "Seditor",
    global: {
      title: "Seditor Page Title",
      bodyColor: "#fff",
      css: "",
      js: "",
    },
  }

  @observable mainTree: componentsTreeProp[] = []

  @observable componentsTree: componentsTreeProp[] = []

  @action.bound handleSetGlobalSetting(globalSetting: globalSettingProp) {
    this.globalSetting = globalSetting
  }

  @action.bound handleSetMainTree(mainTree: componentsTreeProp[]) {
    this.mainTree = [...mainTree]
  }

  @action.bound handleSetComponentsTree(componentsTree: componentsTreeProp[]) {
    this.componentsTree = componentsTree
  }
}

export const DATA_KEY = "dataStore"
