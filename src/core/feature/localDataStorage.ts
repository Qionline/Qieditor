import { setJson2Store, setJson2String } from "@/utils/setJson"
import packageJson from "../../../package.json"

export const STORAGE_NAME = "QieditorData"
export const VERSION_NUMBER_NAME = "QieditorVersion"

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

export const setVersionStorage = () => {
  localStorage.setItem(VERSION_NUMBER_NAME, packageJson.version)
}

export const getVersionStorage = () => {
  const version = localStorage.getItem(VERSION_NUMBER_NAME)
  if (version === packageJson.version) {
    return true
  }
  return false
}
