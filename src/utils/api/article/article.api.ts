import commonAxios from '@/utils/axios/commom.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_ARTICLE_DTO, UPDATE_ARTICLE_DTO } from './article.api.types'

const articleApi = {
  getList: () => {
    return commonAxios.get<AxiosResponseData>('/articles')
  },

  createArticle: (payload: CREATE_ARTICLE_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/articles/', {
      ...payload.params,
    })
  },

  updateArticle: (id: string, payload: UPDATE_ARTICLE_DTO) => {
    console.log(payload.params.thumbnail)

    return formDataAxios.put<AxiosResponseData>(`/articles/${id}`, {
      ...payload.params,
    })
  },
}

export default articleApi
