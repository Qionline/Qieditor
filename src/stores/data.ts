import { action, observable } from "mobx"

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
    filename: "Qieditor",
    global: {
      title: "Qieditor Page Title",
      direction: "ltr",
      bodyColor: "#fff",
      css: "",
      js: "",
    },
  }

  @observable mainTree: componentsTreeProp[] = [
    {
      id: 0,
      name: "main",
      params: {},
      htmlstr: '<img style="width:100%;" src="https://5b0988e595225.cdn.sohucs.com/images/20190617/aa741b738448438f87c8659dd5e5ea32.png" />',
    },
  ]

  @observable componentsTree: componentsTreeProp[] = [
    {
      id: 1,
      name: "list-item",
      params: {
        a1: {
          type: "text",
          title: "我是标题a1",
          value: "33",
        },
        a2: {
          type: "text",
          title: "我是标题a2",
          value: "a2a2a2a2",
        },
      },
      htmlstr: "<div>item<span>i m <%a1%>|<%a2%></span></div>",
    },
    {
      id: 2,
      name: "list-item2",
      params: {
        a1: {
          type: "text",
          title: "我是标题a2",
          value: "11",
        },
      },
      htmlstr: "<div>item<span>i m <%a1%></span></div>",
    },
  ]

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
