import { message } from 'antd'
import axios from 'axios'

import { getToken, hasToken } from './storage'
import history from './history'

export const baseURL = 'http://geek.itheima.net/v1_0'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (!err.response) {
      // 网络超时
      message.error('网络繁忙，请稍后重试')
      return Promise.reject('网络繁忙，请稍后重试')
    }

    // 如果token过期
    if (err.response?.status === 401) {
      // 删除
      // removeToken()
      message.warn('登陆信息过期')

      // 跳转到登陆页面
      // window.location.href = '/login'
      history.push('/')
    }
    return Promise.reject(err)
  }
)
export default instance
