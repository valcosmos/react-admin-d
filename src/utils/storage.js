// 封装所有的localstorage的操作

const TOKEN_KEY = 'token_key'

/**
 * 设置token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * 获取token
 * @returns
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * 移除token
 * @returns
 */

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * 是否存在token
 * @returns
 */
export const hasToken = () => !!getToken()
