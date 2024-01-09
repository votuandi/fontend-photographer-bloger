import commonAxios from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios";
import type { IGetAccountBannerPayload, IGetMemberSettingPayload } from "./setting.api.types";

const settingApi = {
  getMemberSettings: (payload: IGetMemberSettingPayload) => {
    return commonAxios.post<AxiosResponseData>("/api/member/members/get_data_settings.json", {
      ...payload.params,
      cancelToken: payload.cancelToken,
    });
  },
  getAccountBanner: (payload: IGetAccountBannerPayload) => {
    return commonAxios.post<AxiosResponseData>("/api/setting/banners/list.json", {
      ...payload.params,
      cancelToken: payload.cancelToken,
    });
  }
};

export default settingApi;
