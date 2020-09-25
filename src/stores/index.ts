// ./src/stores/index.ts
import { createContext, useContext } from "react"
import { DATA_KEY, DataStore } from "./data"

export const stores = { [DATA_KEY]: new DataStore() }

const StoresContext = createContext(stores)

export const useDataStore = () => {
  const { dataStore } = useContext(StoresContext)
  return dataStore
}
