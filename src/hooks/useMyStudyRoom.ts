import useSWR from 'swr';
import { API_END_POINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios from 'axios';
import { IStudyRoom } from '@shared/interface';
import useUser from './useUser';
import { SWRResponse } from 'swr/dist/types';

async function fetcher(url: string, accessToken?: string | null) {
  const response = await axios.get(url, {
    headers: {
      authorization: accessToken,
    },
  });

  return response.data?.data;
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
