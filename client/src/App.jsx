import {useContext} from "react"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import {Context} from "."
import {baseURL} from "./http"
import {observer} from "mobx-react-lite"

const App = observer(() => {
  const {store} = useContext(Context)
  console.log(store.backgr.img)
  // (store.backgr.img ||
  return (
    <div 
      // style={{background:`url(${process.env.REACT_APP_API_URL + (store.backgr.img || "1000.jpg")}) no-repeat`,
      style={{background:`url(${baseURL + "api/" + (store.backgr.img || "1000.jpg")})no-repeat`, 
      backgroundSize: "cover"}}
    >
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
})

export default App

