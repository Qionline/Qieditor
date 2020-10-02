import { action, observable } from "mobx"

export class StateStore {
  @observable componetSelectState = 0

  @action.bound handleSetComponetSelectState(index: number) {
    this.componetSelectState = index
  }
}

export const STATE_KEY = "stateStore"
