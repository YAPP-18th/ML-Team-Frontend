import axios, { AxiosError } from 'axios';
import { API_END_POINT } from '@shared/common';
import useAccessToken from '../useAccessToken';
import { getResponseObj } from '@shared/utils';
import { IStudyLog } from '@shared/interface';

export interface IStudyLogFetchOption {
  date?: string;
  user_id?: number;
}

export default async function getStudyLog(
  option: IStudyLogFetchOption,
  accessToken: string | null,
) {
  return axios
    .get(`${API_END_POINT}/api/my-studies`, {
      params: option || null,
      headers: {
        authorization: accessToken,
      },
    })
    .then((res) => {
      return (res.data?.data as [])?.map((i) =>
        getResponseObj(i),
      ) as IStudyLog[];
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}
