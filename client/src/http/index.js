import axios from "axios";

const baseURL = "http://localhost:3003/"
  // process.env.NODE_ENV === "production"
  //   ? "/"
  // //   // : "/"
    
  //     : process.env.REACT_APP_API_URL
  //    console.log(baseURL)

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