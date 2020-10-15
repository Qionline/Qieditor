import { stores } from "@/stores"

export const setJson2Store = (data: string) => {
  const json = JSON.parse(data)
  stores.dataStore.handleSetGlobalSetting({
    filename: json.filename,
    global: {
      ...json.global,
    },
  })
  stores.dataStore.handleSetMainTree([...json.main])
  stores.dataStore.handleSetComponentsTree([...json.component])
}

export const setJson2String = () => {
  const json = {
    ...stores.dataStore.globalSetting,
    main: [...stores.dataStore.mainTree],
    component: [...stores.dataStore.componentsTree],
  }
  return JSON.stringify(json)
}
