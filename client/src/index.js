import React, {createContext} from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Store from "./store/Store"

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    store: new Store()
  }}>
    <App />
  </Context.Provider>,  
  document.getElementById("root")
)

