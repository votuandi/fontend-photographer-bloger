import { CancelToken, RawAxiosRequestHeaders } from 'axios';

type Payload = {
  cancelToken?: CancelToken;
};

export type IGetMemberSettingPayload = {
  params: {
    language: "eng" | "zho"
  };
} & Payload;

export type IGetMemberSettingResponse = {
  country_code: ICountryCodeItem[]
  gender: IGenderItem[]
  lang: ILanguageItem[]
}

export type ICountryCodeItem = {
  id: string
  name: string
}

export type IGenderItem = {
  id: string | number
  name: string
}

export type ILanguageItem = {
  id: string | number
  name: string
}

export type IGetAccountBannerPayload = {
  params: {
    language: "eng" | "zho"
    type: "registration" | "homepage"
  };
} & Payload;

export type IGetAccountBannerResponse = IBannerItem[]

export type IBannerItem = {
  id: string,
  content_type: string
  content_id: string
  publish_date: string
  unpublish_date : string
  image: string
  url: string
  sorting: string
  enabled: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
}