import commonAxios from '@/utils/axios/commom.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_ARTICLE_CONTENT_DTO, UPDATE_ARTICLE_CONTENT_DTO } from './articleContent.api.types'

const articleApi = {
  getListByArticleId: (aid: string) => {
    return commonAxios.get<AxiosResponseData>(`/article-contents/article/${aid}`)
  },

  getById: (id: string) => {
    return commonAxios.get<AxiosResponseData>(`/article-contents/${id}`)
  },

  createContent: (payload: CREATE_ARTICLE_CONTENT_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/article-contents/', {
      ...payload.params,
    })
  },

  updateContent: (id: string, payload: UPDATE_ARTICLE_CONTENT_DTO) => {
    return formDataAxios.put<AxiosResponseData>(`/article-contents/${id}`, {
      ...payload.params,
    })
  },

  deleteById: (id: string) => {
    return commonAxios.delete<AxiosResponseData>(`/article-contents/${id}`)
  },
}

export default articleApi
