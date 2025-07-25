import axios, {
  AxiosInstance,
  AxiosResponse,
  CancelTokenSource,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import { apiBasePath } from '../local_settings'
// import { AuthAccessTokenKey } from "@/auth/auth-provider";

const instance: AxiosInstance = axios.create({
  baseURL: apiBasePath,
  timeout: 30000, // Add Time out To handle long Response Such as 30 seconds
})

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem(AuthAccessTokenKey);
    // if (token) {
    //   config.headers.Authorization = token;
    // }
    config.headers['Content-Type'] = 'application/json'
    config.headers.Accept = 'application/json'
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.replace(`${window.location.origin}/login`)
      window.location.reload()
      localStorage.removeItem('CMP-AccessToken')
    }
    return Promise.reject(error)
  },
)

const cancelTokenSource = axios.CancelToken.source()
const cancelRequest = (): CancelTokenSource => axios.CancelToken.source()

export { cancelTokenSource, cancelRequest }
export default instance
