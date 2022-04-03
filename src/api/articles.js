import request from 'utils/request'

export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export const delArticle = (id) => request.delete(`/mp/articles/${id}`)
