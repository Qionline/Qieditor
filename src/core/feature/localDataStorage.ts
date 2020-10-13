import { stores } from "@/stores"

export const setLocalDataStorage = () => {
  const json = {
    ...stores.dataStore.globalSetting,
    mainTree: [...stores.dataStore.mainTree],
    componentsTree: [...stores.dataStore.componentsTree],
  }
  localStorage.setItem("QieditorData", JSON.stringify(json))
}

export const getLocalDataStorage = () => {
  const data = localStorage.getItem("QieditorData")
  if (!data) return false
  const json = JSON.parse(data)
  stores.dataStore.handleSetGlobalSetting({
    filename: json.filename,
    global: {
      ...json.global,
    },
  })
  stores.dataStore.handleSetMainTree([...json.mainTree])
  stores.dataStore.handleSetComponentsTree([...json.componentsTree])
  return true
}
