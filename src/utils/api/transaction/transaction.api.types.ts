import { ServiceTypeType } from '@/types/common'
import { CancelToken, RawAxiosRequestHeaders } from 'axios'

type Payload = {
  cancelToken?: CancelToken
}

export type IGetListProductGiftPayload = {
  params: {
    language: 'eng' | 'zho'
    page?: number
    limit?: number
    keyword?: string
    service_type?: '' | 'car_cleaning' | 'commerce_cleaning' | 'home_cleaning'
    type?: 'all' | 'product' | 'gift'
    sort_direction?: 'ASC' | 'DESC'
    sort?: 'price' | 'categories' | 'type' | ''
  }
} & Payload

export type IGetListProductGiftResponse = {
  limit: number
  page: number
  total_record: number
  Service: IProductGiftItem[]
}

export type IProductGiftItem = {
  id: string
  price: string
  type: 'product' | 'service' | 'gift'
  name: string
  service_type_id: string
  categories: string
  image: string
  discount_amount: string
  service_type: string
  price_after_discount: string
}

export type IAddCartDetailPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    item_type: 'product' | 'service' | 'gift'
    item_id: number | string
    qty: number | string
  }
} & Payload

export type IAddCartDetailResponse = any

export type IGetCartPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
  }
} & Payload

export type IGetCartResponse = {
  Cart: ICart
  CartDetail: ICartDetailItem[]
}

export type ICart = {
  id: string
  member_id: string
  coupon_id: string
  total_amount: string
  shipping_fee: string
  disc_amount: string
  grand_total: string
  name: string
  phone: string
  address: string
  remark: string
}

export type ICartDetailItem = {
  Cart: ICartGetCart
  CartDetail: ICartDetailGetCart[]
}

export type ICartGetCart = {
  id: string
  member_id: string
  coupon_id: string
  total_amount: string
  shipping_fee: string
  disc_amount: string
  grand_total: string
  name: string
  phone: string
  address: string
  remark: string
}

export type ICartDetailGetCart = {
  id: string
  cart_id: string
  product_id: string
  service_id: string
  gift_id: string
  qty: string
  price: string
  is_selected: boolean
  remark: string
  Item: ICartDetailItemGetCart
}

export type ICartDetailItemGetCart = {
  id: string
  service_type_id?: string
  product_category_id?: string
  slug?: string
  sku?: string
  price: string
  discount_amount?: string
  image: string
  enabled: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
  price_after_discount: string
  type: 'product' | 'service' | 'gift'
  service_type: string
  categories: string
  name: string
  short_description: string
  amount?: string
  unit_type?: string
  limit_by_day?: string
  limit_by_month?: string
  limit_by_total?: string
  publish_date?: string
  unpublish_date?: string
  redeem_start_date?: string
  redeem_end_date?: string
  available_type_id?: string
  expiry_date?: string
  expiry_range?: string
  quantity?: string
  thumbnail_image?: string
  sorting?: string
}

export type IUpdateCartItemPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    cart_detail_id: string | number
    qty: string | number
    is_delete?: 0 | 1
  }
} & Payload

export type IUpdateCartItemResponse = {
  Cart: ICart
  CartDetail: ICartDetailItem[]
}

export type IRemoveAllCartItemPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
  }
} & Payload

export type IRemoveAllCartItemResponse = {
  Cart: ICart
  CartDetail: ICartDetailItem[]
}

export type ICreateQuotationPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    name: string
    email: string
    country_code: string
    phone: string
    implemented_date: string
    address: string
    service_id: string | number
    title: string
    message: string
  }
} & Payload

export type ICreateQuotationResponse = any

export type IGetQuotationListPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    type: 'waiting_response' | 'replied'
    limit: string | number
    page: string | number
    keyword?: string
    service_type?: ServiceTypeType
  }
} & Payload

export type IGetQuotationListResponse = {
  limit: number
  page: number
  total_record: number
  Quotation: IQuotationItem[]
}

export type IQuotationItem = {
  id: string
  member_id: string
  date: string
  name: string
  email: string
  company: string
  address: string
  country_code: string
  phone: string
  title: string
  estimated_date: string
  message: string
  status: string
  updated: string
  updated_by: string
  created: string
  created_by: string
  estimated_time: string
  QuotationDetail: IQuotationDetail[]
  service_type: 'Car Cleaning' | 'Hone Cleaning' | 'Commerce Cleaning'
  service_category: string
}

export type IQuotationDetail = {
  id: string
  quotation_id: string
  service_id: string
  price: string
  qty: string
  remark: string
  thumbnail_image: string
  title: string
  subtitle: string
  description: string
  introduction: string
}

export type IGetQuotationDetailPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    quotation_id: string | number
  }
} & Payload

export type IGetQuotationDetailResponse = {
  total: string
  notes: string
} & IQuotationItem

export type IUpdateShoppingCartPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    cart_detail_id: string
    member_coupon_id?: string | number
    deposit?: number
  }
} & Payload

export type IUpdateShoppingCartResponse = {
  Cart: ICart
  CartDetail: ICartDetailItem[]
}
