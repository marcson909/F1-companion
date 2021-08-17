import { createContext } from 'react'

const TabContext = createContext({
  setActiveTab: (at) => {},
  activeTab: ""
})

export default TabContext