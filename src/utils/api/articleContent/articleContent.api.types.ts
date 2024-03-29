import { ARTICLE_CONTENT_TYPES, ARTICLE_CONTENT_WIDTHS } from '@/types/common'
import { ARTICLE_ITEM_TYPE } from '../article/article.api.types'

export type GET_CONTENTS_BY_ARTICLE_ID_PAYLOAD = {
  params: {}
}

export type GET_CONTENTS_BY_ARTICLE_ID_RESPONSE = ARTICLE_CONTENT_ITEM_TYPE[]

export type ARTICLE_CONTENT_ITEM_TYPE = {
  id: string
  previous?: string | null
  type: string
  content: string
  width: string
  article: ARTICLE_ITEM_TYPE
}

export type CREATE_ARTICLE_CONTENT_DTO = {
  params: {
    previous: string
    type: ARTICLE_CONTENT_TYPES
    width: ARTICLE_CONTENT_WIDTHS
    content: string
    articleId: string
    image: File | null
  }
}

export type UPDATE_ARTICLE_CONTENT_DTO = {
  params: {
    previous: string
    type: string
    content: string
    width: string
    articleId: string
  }
}

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
