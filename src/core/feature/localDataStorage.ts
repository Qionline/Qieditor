import { setJson2Store, setJson2String } from "@/utils/setJson"

export const STORAGE_NAME = "QieditorData"

export const setLocalDataStorage = () => {
  const json = setJson2String()
  localStorage.setItem(STORAGE_NAME, json)
}

export const getLocalDataStorage = () => {
  const data = localStorage.getItem(STORAGE_NAME)
  if (!data) return false
  setJson2Store(data)
  return true
}
