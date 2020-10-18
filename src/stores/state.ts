import { action, observable } from "mobx"

export type confMenuStateProp = "global" | "comp"

export class StateStore {
  @observable componetSelectState = 0
  @action.bound handleSetComponetSelectState(index: number) {
    this.componetSelectState = index
  }

  @observable confMenuState: confMenuStateProp = "global"
  @action.bound handleSetConfMenuState(state: confMenuStateProp) {
    this.confMenuState = state
  }
}

export const STATE_KEY = "stateStore"
