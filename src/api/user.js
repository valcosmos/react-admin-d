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
