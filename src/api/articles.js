import request from 'utils/request'

export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export const delArticle = (id) => request.delete(`/mp/articles/${id}`)

export const addArticles = (data, draft = false) =>
  request.post(`/mp/articles?draft=${draft}`, data)

export const getArticleById = (id) => request.get(`/mp/articles/${id}`)

export const updateArticles = (data, draft = false) =>
  request.put(`/mp/articles/${data.id}?draft=${draft}`, data)
