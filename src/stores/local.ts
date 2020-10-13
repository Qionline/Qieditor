import { action, observable } from "mobx"

type phoneTypeEnum = "ios" | "android"

export interface localSettingProp {
  phoneType: phoneTypeEnum
  scrollPosition: number
}

export class LocalSettingStore {
  @observable localSetting: localSettingProp = {
    phoneType: "ios",
    scrollPosition: 0,
  }

  @action.bound handleSetPhoneType(type: phoneTypeEnum) {
    this.localSetting.phoneType = type
  }
  @action.bound handleSetScrollPosition(num: number) {
    this.localSetting.scrollPosition = num
  }
}

export const LOCALSETTING_KEY = "localSettingStore"
