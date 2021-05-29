import useSWR from 'swr';
import { API_END_POINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios from 'axios';
import { IStudyRoom } from '@shared/types';
import { SWRResponse } from 'swr/dist/types';

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
  const response = await axios.get(url, {
    params: option || null,
    headers: {
      authorization: accessToken,
    },
  });

  return response.data?.data;
}

function useStudyRoom(
  option?: IStudyRoomFetchOption,
): SWRResponse<IStudyRoom[], any> {
  const [accessToken] = useAccessToken();
  const _useSWR = useSWR(STUDY_ROOM_END_POINT, (url) =>
    fetcher(url, accessToken, option),
  );

  return _useSWR;
}

export const STUDY_ROOM_END_POINT = `${API_END_POINT}/api/study-rooms`;

export default useStudyRoom;
