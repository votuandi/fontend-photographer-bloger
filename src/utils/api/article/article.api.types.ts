export type GET_ARTICLE_LIST_PAYLOAD = {
  params: {}
}

export type GET_ARTICLE_LIST_RESPONSE = ARTICLE_ITEM_TYPE[]

// export type UPDATE_CATEGORY_DTO = {
//   params: {
//     name: string
//     active: boolean
//   }
// }

export type CREATE_ARTICLE_DTO = {
  params: {
    title: string
    shortDescription: string
    createBy: string
    publicTime: string
    hashtag: string
    categoryId: string
    thumbnail: File
    active: '1' | '0'
  }
}
export type ARTICLE_ITEM_TYPE = {
  id: string
  title: string
  shortDescription: string
  createTime: string
  createBy: string
  publicTime: string
  hashtag: string
  thumbnail: string
  active: boolean
  category: CATEGORY_ITEM_TYPE
}

export type CATEGORY_ITEM_TYPE = {
  id: string
  name: string
  active: boolean
  thumbnail: string
  createTime: string
}
