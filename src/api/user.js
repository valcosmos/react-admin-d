import request from 'utils/request'

/**
 * login request
 * @param {string} mobile
 * @param {string} code
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户信息
 * @returns 
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/user/profile'
  })
}
