import commonAxios from '@/utils/axios/commom.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_ARTICLE_DTO } from './article.api.types'

const articleApi = {
  // getList: () => {
  //   return commonAxios.get<AxiosResponseData>('/categories')
  // },

  createArticle: (payload: CREATE_ARTICLE_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/articles/', {
      ...payload.params,
    })
  },

  // updateCategory: (id: string, payload: UPDATE_CATEGORY_DTO) => {
  //   return commonAxios.put<AxiosResponseData>(`/categories/${id}`, {
  //     ...payload.params,
  //   })
  // },
}

export default articleApi
