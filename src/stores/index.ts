import { createContext, useContext } from "react"
import { DATA_KEY, DataStore } from "./data"
import { STATE_KEY, StateStore } from "./state"

export const stores = { [DATA_KEY]: new DataStore() }
const StoresContext = createContext(stores)
export const useDataStore = () => useContext(StoresContext).dataStore


export const stateStores = { [STATE_KEY]: new StateStore() }
const stateStoresContext = createContext(stateStores)
export const useStateStore = () => useContext(stateStoresContext).stateStore
