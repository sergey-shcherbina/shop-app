import axios from "axios"

const baseURL = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001/"
// console.log(baseURL)
const npURL = "https://api.novaposhta.ua/v2.0/json/Address/searchSettlements/"

const $host = axios.create({
  baseURL
})
const $authHost = axios.create({
  baseURL
})
const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost,
  baseURL
}