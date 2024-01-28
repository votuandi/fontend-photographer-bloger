import commonAxios from '@/utils/axios/commom.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { UPDATE_CATEGORY_DTO } from './category.api.types'

const categoryApi = {
  getList: () => {
    return commonAxios.get<AxiosResponseData>('/categories')
  },

  createCategory: (payload: UPDATE_CATEGORY_DTO) => {
    return commonAxios.post<AxiosResponseData>('/categories/', {
      ...payload.params,
    })
  },

  updateCategory: (id: string, payload: UPDATE_CATEGORY_DTO) => {
    return commonAxios.put<AxiosResponseData>(`/categories/${id}`, {
      ...payload.params,
    })
  },
}

export default categoryApi
