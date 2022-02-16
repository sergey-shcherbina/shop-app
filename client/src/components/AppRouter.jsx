import React, {useContext} from "react"
import {Routes, Route} from "react-router-dom"
import Admin from "../pages/Admin"
import Basket from "../pages/Basket"
import Home from "../pages/Home"
import Main from "../pages/Main"
import Auth from "../pages/Auth"
import FlowerPage from "../pages/FlowerPage"
import GroupPage from "../pages/GroupPage"
import Gallery from "../pages/Gallery"
import {Context} from ".."
import {observer} from "mobx-react-lite"

const AppRouter = observer(() => {
  const {store} = useContext(Context)
  
  return (
    <Routes>
    {/* {user.isAuth && authRoutes.map(({path, Component}) => 
      <Route key={path} path={path} element={Component} />
    )} 
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} />
    )} */}
    {store.user.role === "ADMIN" && 
      <Route path="/admin" element={<Admin />} />
    }
    <Route path="/" element={<Main />} />
    <Route path="/home" element={<Home />} />
    <Route path="/registration" element={<Auth />} />
    <Route path="/login" element={<Auth />} />
    <Route path="/group_page" element={<GroupPage />} />
    <Route path="/flower" element={<FlowerPage />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/basket" element={<Basket />} />
    <Route path="*" element={<Main />} />
  </Routes>
  )
})

export default AppRouter
