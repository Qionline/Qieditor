import { action, observable } from "mobx"

export type confMenuStateProp = "global" | "comp"

export class StateStore {

  // 选中的组件位置
  @observable componetSelectState = 0
  @action.bound handleSetComponetSelectState(index: number) {
    this.componetSelectState = index
  }

  // 右侧的全局/组建配置点击
  @observable confMenuState: confMenuStateProp = "global"
  @action.bound handleSetConfMenuState(state: confMenuStateProp) {
    this.confMenuState = state
  }
}

export const STATE_KEY = "stateStore"
