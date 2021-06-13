import useSWR from 'swr';
import { API_END_POINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios, { AxiosError } from 'axios';
import { IStudyRoom } from '@shared/interface';
import useUser from './useUser';
import { SWRResponse } from 'swr/dist/types';
import { getRequestObj, getResponseObj } from '@shared/utils';

async function fetcher(url: string, accessToken?: string | null) {
  return axios
    .get(url, {
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

function useMyStudyRoom(): SWRResponse<IStudyRoom[], any> {
  const user = useUser();
  const [accessToken] = useAccessToken();
  const _useSWR = useSWR(
    user?.data?.id ? `${MY_STUDY_ROOM_END_POINT}${user?.data?.id}` : null,
    (url) => fetcher(url, accessToken),
  );

  return _useSWR;
}

export const MY_STUDY_ROOM_END_POINT = `${API_END_POINT}/api/study-rooms?owner_id=`;

export default useMyStudyRoom;
