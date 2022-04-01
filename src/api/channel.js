import request from 'utils/request'

/**
 * 获取频道数据
 * @returns 
 */
export const getChannels = () =>
  request({
    method: 'GET',
    url: '/channels'
  })
