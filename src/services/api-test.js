import axios from "axios"
import Cookies from "js-cookie"

const Api2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ppid.padang.go.id/api/v1", // bisa ambil dari .env
  headers: {
    "Content-Type": "application/json",
  },
})
// Request interceptor → tambahin Authorization header kalau ada token
Api2.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor → kalau token expired bisa handle di sini
Api2.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired atau tidak valid, silakan login ulang.")
      // optional: redirect ke login
      // window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  }
)

export default Api2
