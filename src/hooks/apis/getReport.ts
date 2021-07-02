import axios, { AxiosError } from 'axios';
import { API_END_POINT } from '@shared/common';
import useAccessToken from '../useAccessToken';
import { getResponseObj } from '@shared/utils';
import { IReport } from '@shared/interface';

export interface IReportFetchOption {
  date?: string;
  user_id?: number;
}

export default async function getReport(
  option: IReportFetchOption,
  accessToken: string | null,
) {
  return axios
    .get(`${API_END_POINT}/api/reports`, {
      params: option || null,
      headers: {
        authorization: accessToken,
      },
    })
    .then((res) => {
      return (res.data?.data as [])?.map((i) => getResponseObj(i)) as IReport[];
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}
