import useSWR from 'swr';
import { API_END_POINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios, { AxiosError } from 'axios';
import { IStudyRoom } from '@shared/interface';
import { SWRResponse } from 'swr/dist/types';
import { getRequestObj, getResponseObj } from '@shared/utils';

interface IStudyRoomFetchOption {
  skip?: number;
  limit?: number;
  owner_id?: number;
  option?: string;
}

async function fetcher(
  url: string,
  accessToken?: string | null,
  option?: IStudyRoomFetchOption,
) {
  return axios
    .get(url, {
      params: option || null,
      headers: {
        authorization: accessToken,
      },
    })
    .then((res) => {
      return (res.data?.data as [])?.map((i) =>
        getResponseObj(i),
      ) as IStudyRoom[];
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}

function useStudyRooms(
  option?: IStudyRoomFetchOption,
): SWRResponse<IStudyRoom[], AxiosError> {
  const [accessToken] = useAccessToken();
  const _useSWR = useSWR(STUDY_ROOM_END_POINT, (url) =>
    fetcher(url, accessToken, option),
  );

  return _useSWR;
}

export const STUDY_ROOM_END_POINT = `${API_END_POINT}/api/study-rooms`;

export default useStudyRooms;
