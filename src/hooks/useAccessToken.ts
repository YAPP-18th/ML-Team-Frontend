import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

export function setAccessToken(_token?: string | null): void {
  writeStorage('accessToken', _token);
}

function useAccessToken(): [string | null, (i?: string | null) => void] {
  const [accessToken] = useLocalStorage('accessToken');

  return [accessToken, setAccessToken];
}

export default useAccessToken;
