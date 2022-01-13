import {useContext} from "react"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import {Context} from "."
import {baseURL} from "./http"

const App = () => {
  const {store} = useContext(Context)
  return (
    <div 
      // style={{background:`url(${process.env.REACT_APP_API_URL + (store.backgr.img || "1000.jpg")}) no-repeat`,
      style={{background:`url(${baseURL + "api/" + (store.backgr.img || "1000.jpg")}) no-repeat`, 
      backgroundSize: "cover", width: "100vw", height: "100vh"}}
    >
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App

