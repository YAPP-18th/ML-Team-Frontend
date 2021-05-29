import useSWR from 'swr';
import { API_ENDPOINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios from 'axios';
import { IApiHookReponse, IUser } from '@shared/types';

async function fetcher(url: string) {
  const accessToken = useAccessToken();

  const response = await axios.get(url, {
    headers: {
      authorization: accessToken,
    },
  });

  return response.data;
}

function useUser(): IApiHookReponse<IUser> {
  const { data, error } = useSWR(`${API_ENDPOINT}/api/user/get`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
}

export default useUser;
