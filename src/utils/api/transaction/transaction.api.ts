import commonAxios from '@/utils/axios/common.axios'

import type { AxiosResponseData } from '@/utils/axios'
import {
  IAddCartDetailPayload,
  ICreateQuotationPayload,
  IGetCartPayload,
  IGetListProductGiftPayload,
  IGetQuotationDetailPayload,
  IGetQuotationListPayload,
  IRemoveAllCartItemPayload,
  IUpdateCartItemPayload,
  IUpdateShoppingCartPayload,
} from './transaction.api.types'

const transactionApi = {
  getListProductGift: (payload: IGetListProductGiftPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/carts/get_product_gift_list.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  addToCart: (payload: IAddCartDetailPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/carts/add_cart_detail.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  getCart: (payload: IGetCartPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/carts/get_cart.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  updateCartItem: (payload: IUpdateCartItemPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/carts/update_cart_detail.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  removeAllCartItems: (payload: IRemoveAllCartItemPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/carts/remove_all_items.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  createQuotation: (payload: ICreateQuotationPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/quotations/create_quotation.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  getQuotationList: (payload: IGetQuotationListPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/quotations/list.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  getQuotationDetail: (payload: IGetQuotationDetailPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/quotations/detail.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },

  updateShoppingCart: (payload: IUpdateShoppingCartPayload) => {
    return commonAxios.post<AxiosResponseData>('/api/transaction/carts/update_cart.json', {
      ...payload.params,
      cancelToken: payload.cancelToken,
    })
  },
}

export default transactionApi
