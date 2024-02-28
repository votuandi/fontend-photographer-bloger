export type GET_BANNER_LIST_PAYLOAD = {
  params: {}
}

export type GET_BANNER_LIST_BY_DEVICE_PAYLOAD = {
  params: {
    device: 'pc' | 'mobile'
  }
}

export type GET_BANNER_LIST_RESPONSE = BANNER_ITEM_TYPE[]

export type BANNER_ITEM_TYPE = {
  id: string
  path: string
  index: number
  createTime: Date
  device: 'pc' | 'mobile'
}

export type CREATE_BANNER_DTO = {
  params: {
    device: 'pc' | 'mobile'
    image: File
  }
}

export type UPDATE_BANNER_DTO = {
  params: {
    action: 'up' | 'down'
  }
}
