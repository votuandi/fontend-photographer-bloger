import { CancelToken, RawAxiosRequestHeaders } from 'axios'

type Payload = {
  cancelToken?: CancelToken
}

export type IRegisterPayload = {
  params: {
    language: 'eng' | 'zho'
    country_code: string
    phone: string
    name: string
    email: string
    password: string
    confirm_password: string
    gender_id: string
    date_of_birth: string
    referral_member_phone: string
    referral_member_country_code: string
    receive_notification: string
    policy_agreement: string
  }
} & Payload

export type IRegisterResponse = {}

export type IGetMemberDataPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
  }
} & Payload

export type IGetMemberDataResponse = {
  id: string
  referral_member_id: string
  facebook_id: string
  facebook_token: string
  apple_id: string
  code: string
  qrcode_path: string
  image: string
  is_registered: boolean
  name: string
  language_code: string
  gender_id: string
  join_date: string
  country_code: string
  phone: string
  phone_verified: boolean
  password: string
  email: string
  date_of_birth: string
  receive_notification: boolean
  policy_agreement: boolean
  token: string
  enabled: boolean
  is_request_to_be_deleted: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
  points: number
  deposit: number
  data_point: string
}

export type IGetProfileDataPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
  }
} & Payload

export type IGetProfileDataResponse = {
  id: string
  referral_member_id: string
  facebook_id: string
  facebook_token: string
  apple_id: string
  code: string
  qrcode_path: string
  image: string
  is_registered: boolean
  name: string
  language_code: string
  gender_id: string
  join_date: string
  country_code: string
  phone: string
  phone_verified: boolean
  email: string
  date_of_birth: string
  receive_notification: boolean
  policy_agreement: boolean
  token: string
  enabled: boolean
  is_request_to_be_deleted: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
  points: number
}

export type IGetAddressListPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
  }
} & Payload

export type IMemberAddressItem = {
  id: string
  member_id: string
  name: string
  phone: string
  address: string
  is_default: boolean
}

export type IGetAddressListResponse = {
  MemberAddress: IMemberAddressItem
}[]

export type IAddAddressPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    name: string
    address: string
    phone: string
    is_default: 0 | 1
  }
} & Payload

export type IAddAddressResponse = IMemberAddressItem

export type IGetAddressDetailPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    address_id?: string | number
  }
} & Payload

export type IGetAddressDetailResponse = IMemberAddressItem

export type IUpdateDefaultAddressPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    address_id: string | number
    is_default: 0 | 1
  }
} & Payload

export type IUpdateDefaultAddressResponse = any

export type IUpdateAddressPayload = {
  params: {
    language: 'eng' | 'zho'
    token: string
    address_id: string | number
    is_delete?: 0 | 1
    is_default: 0 | 1
    name: string
    phone: string
    address: string
  }
} & Payload

export type IUpdateAddressResponse = IMemberAddressItem
