import commonAxios from '@/utils/axios/commom.axios'
import type { AxiosResponseData } from '@/utils/axios'

const categoryApi = {
  getList: () => {
    return commonAxios.get<AxiosResponseData>('/categories')
  },
}

export default categoryApi
