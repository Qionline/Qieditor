import { action, observable } from "mobx"

type phoneTypeEnum = "ios" | "android"

export interface localSettingProp {
  phoneType: phoneTypeEnum
}

export class LocalSettingStore {
  @observable localSetting: localSettingProp = {
    phoneType: "ios",
  }

  @action.bound handleSetPhoneType(type: phoneTypeEnum) {
    this.localSetting.phoneType = type
  }
}

export const LOCALSETTING_KEY = "localSettingStore"
