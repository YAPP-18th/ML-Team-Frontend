import useSWR from 'swr';
import { API_END_POINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios from 'axios';
import { IUser } from '@shared/types';
import { SWRResponse } from 'swr/dist/types';

async function fetcher(url: string, accessToken?: string | null) {
  const response = await axios.get(url, {
    headers: {
      authorization: accessToken,
    },
  });

  return response.data?.data;
}

function useUser(): SWRResponse<IUser, any> {
  const [accessToken] = useAccessToken();
  const _useSWR = useSWR(USER_END_POINT, (url) => fetcher(url, accessToken));

  return _useSWR;
}

const USER_END_POINT = `${API_END_POINT}/api/user/get`;

export default useUser;
