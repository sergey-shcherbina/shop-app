import {$authHost, $host} from "."
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name) => {
  const {data} = await $host.post("api/user/registration", {email, password, name})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const login = async (email, password) => {
  const {data} = await $host.post("api/user/login", {email, password})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const check = async () => {
  const {data} = await $authHost.get("api/user/auth")
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
// export const fetchUsers = async () => {
//   const {data} = await $authHost.get("api/user")
//   return data
// }
export const fetchUser = async (email) => {
  const {data} = await $host.get("api/user", {params: {email}})
  return data
}
export const createBuyer = async (buyer) => {
  const {data} = await $host.post("api/buyer", buyer)
  return data
}
export const editBuyer= async (id, buyer) => {
  const {data} = await $host.put("api/buyer/" + id, buyer)
  return data
}
export const fetchBuyer = async (email) => {
  const {data} = await $host.get("api/buyer", {params: {email}})
  return data
}
export const fetchBuyerId = async (id) => {
  const {data} = await $host.get("api/buyer/" + id)
  return data
}
export const createBasket = async (basket) => {
  const {data} = await $host.post("api/basket", basket)
  return data
}
export const editBasket= async (id, finished) => {
  const {data} = await $host.put("api/basket/" + id, finished)
  return data
}
export const fetchBaskets = async (finished) => {
  const {data} = await $host.get("api/basket", {params: {finished}})
  return data
}
export const createBasketFlower = async (basket_flower) => {
  const {data} = await $host.post("api/basket_flower", basket_flower)
  return data
}
export const fetchBasketFlowers = async (basketId) => {
  const {data} = await $host.get("api/basket_flower", {params: {basketId}})
  return data
}

