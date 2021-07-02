import useSWR from 'swr';
import { API_END_POINT } from '@shared/common';
import useAccessToken from './useAccessToken';
import axios, { AxiosError } from 'axios';
import { IUser } from '@shared/interface';
import { SWRResponse } from 'swr/dist/types';
import { getResponseObj } from '@shared/utils';
import { message } from 'antd';
import { useHistory } from 'react-router';

function fetcher(url: string, accessToken?: string | null) {
  return axios
    .get(url, {
      headers: {
        authorization: accessToken,
      },
    })
    .then((res) => {
      return getResponseObj(res.data?.data);
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}

/**
 * @description 유저 정보를 받아오는 Hook입니다.
 * 오류 발생 시 5초 간격으로 revalidate합니다. 최대 3번 시도합니다.
 * 403 오류 발생 시에는 앞으로 retry하지 않습니다.
 */
function useUser(): SWRResponse<IUser, AxiosError> {
  const [accessToken, setAccessToken] = useAccessToken();
  const history = useHistory();
  const _useSWR = useSWR(USER_END_POINT, (url) => fetcher(url, accessToken), {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      const status = (error as AxiosError)?.response?.status;
      // 온보딩
      if (status === 403) return;
      // 권한이 없을 경우
      if (status === 401 || status === 500) {
        setAccessToken(null);
        history.replace('/');
        message.error(
          '유저 정보를 받아오지 못했습니다. 고객센터에 문의해주세요.',
        );
        return;
      }
      if (retryCount >= 3) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
    revalidateOnFocus: false,
  });

  return _useSWR;
}

export const USER_END_POINT = `${API_END_POINT}/api/user/get`;

export default useUser;
