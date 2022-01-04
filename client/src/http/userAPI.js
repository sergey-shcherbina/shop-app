import {$authHost, $host} from "."
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name) => {
  const {data} = await $host.post("user/registration", {email, password, name})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const login = async (email, password) => {
  const {data} = await $host.post("user/login", {email, password})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const check = async () => {
  const {data} = await $authHost.get("user/auth")
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const fetchUsers = async () => {
  const {data} = await $authHost.get("/user")
  return data
}