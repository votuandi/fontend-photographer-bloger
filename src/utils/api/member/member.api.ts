import commonAxios from '@/utils/axios/common.axios'

import type { AxiosResponseData } from '@/utils/axios'
import {
  IAddAddressPayload,
  IGetAddressDetailPayload,
  IGetAddressListPayload,
  IGetMemberDataPayload,
  IGetProfileDataPayload,
  IUpdateAddressPayload,
  IUpdateDefaultAddressPayload,
} from './member.api.types'

const memberApi = {
  getMemberData: (payload: IGetMemberDataPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/get_data_member.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  getProfile: (payload: IGetProfileDataPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/get_data_member.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  getAddressList: (payload: IGetAddressListPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/get_address_list.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  addAddress: (payload: IAddAddressPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/create_new_address.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  getAddressDetail: (payload: IGetAddressDetailPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/get_address.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  updateDefaultAddress: (payload: IUpdateDefaultAddressPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/update_default_address.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  updateAddress: (payload: IUpdateAddressPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/member/members/update_address.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },
}

export default memberApi
