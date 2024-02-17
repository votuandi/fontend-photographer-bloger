import commonAxios from '@/utils/axios/commom.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_ARTICLE_CONTENT_DTO } from './articleContent.api.types'

const articleApi = {
  getListByArticleId: (aid: string) => {
    return commonAxios.get<AxiosResponseData>(`/article-contents/article/${aid}`)
  },

  // getById: (id: string) => {
  //   return commonAxios.get<AxiosResponseData>(`/articles/${id}`)
  // },

  createContent: (payload: CREATE_ARTICLE_CONTENT_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/article-contents/', {
      ...payload.params,
    })
  },

  // updateArticle: (id: string, payload: UPDATE_ARTICLE_DTO) => {
  //   console.log(payload.params.thumbnail)

  //   return formDataAxios.put<AxiosResponseData>(`/articles/${id}`, {
  //     ...payload.params,
  //   })
  // },
}

export default articleApi
