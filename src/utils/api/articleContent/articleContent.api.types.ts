import { ARTICLE_ITEM_TYPE } from '../article/article.api.types'

export type GET_CONTENTS_BY_ARTICLE_ID_PAYLOAD = {
  params: {}
}

export type GET_CONTENTS_BY_ARTICLE_ID_RESPONSE = ARTICLE_CONTENT_ITEM_TYPE[]

export type ARTICLE_CONTENT_ITEM_TYPE = {
  id: string
  previous?: string
  type: string
  content: string
  width: string
  article: ARTICLE_ITEM_TYPE
}

// export type GET_ARTICLE_LIST_RESPONSE = ARTICLE_ITEM_TYPE[]

// export type UPDATE_ARTICLE_DTO = {
//   params: {
//     title: string
//     shortDescription: string
//     publicTime: string
//     hashtag: string
//     categoryId: string
//     active: '1' | '0'
//     thumbnail: File | undefined
//   }
// }

// export type CREATE_ARTICLE_DTO = {
//   params: {
//     title: string
//     shortDescription: string
//     createBy: string
//     publicTime: string
//     hashtag: string
//     categoryId: string
//     thumbnail: File
//     active: '1' | '0'
//   }
// }
// export type ARTICLE_ITEM_TYPE = {
//   id: string
//   title: string
//   shortDescription: string
//   createTime: string
//   createBy: string
//   publicTime: string
//   hashtag: string
//   thumbnail: string
//   active: boolean
//   category: CATEGORY_ITEM_TYPE
// }

// export type CATEGORY_ITEM_TYPE = {
//   id: string
//   name: string
//   active: boolean
//   thumbnail: string
//   createTime: string
// }
