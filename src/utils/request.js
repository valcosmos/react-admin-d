import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (resposnse) => {
    return resposnse.data
  },
  (err) => Promise.reject(err)
)
export default instance
