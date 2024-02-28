import commonAxios from '@/utils/axios/commom.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_BANNER_DTO, UPDATE_BANNER_DTO } from './banner.api.types'

const categoryApi = {
  getList: () => {
    return commonAxios.get<AxiosResponseData>('/banners')
  },

  getByDevice: (device: 'pc' | 'mobile') => {
    return commonAxios.get<AxiosResponseData>(`/banners/device/${device}`)
  },

  createBanner: (payload: CREATE_BANNER_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/banners/', {
      ...payload.params,
    })
  },

  updateBanner: (id: string, payload: UPDATE_BANNER_DTO) => {
    console.log(payload)

    return commonAxios.put<AxiosResponseData>(`/banners/${id}`, {
      ...payload.params,
    })
  },

  deleteById: (id: string) => {
    return commonAxios.delete<AxiosResponseData>(`/banners/${id}`)
  },
}

export default categoryApi
