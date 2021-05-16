import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

// https://sudeep.com/redirect&type=studyroom&id=스터디룸아이디
// InnerRedirect로 왔을 경우
// URL Query Params로 전달받은 type, id를 얻어온다.
// 로그인 여부 확인해서 로그인 X -> /auth로 리다이렉트하고 다시 InnerRedirect로 오게 한다.
// 로그인 O -> 바로 type, id에 맞는 값으로 리다이렉트한다.

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

export const InnerRedirect: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const [redirectUrl, setRedirectUrl] = useState<string>();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const redirectType = query.get('type');

    switch (redirectType) {
      case 'studyroom': {
        const id = query.get('id');
        setRedirectUrl(`/app/study/${id}`);
        break;
      }
    }
  }, [query]);

  useEffect(() => {
    if (redirectUrl) {
      const redirectHandler = () => {
        const hasAccessToken =
          !!cookies?.accessToken && cookies?.accessToken !== '';

        if (hasAccessToken) {
          history.push(redirectUrl);
        } else {
          history.push('/auth', { redirectUrl });
        }
      };

      // ReactiveX
      // 2초 후 redirectHandler 실행
      timer(2000)
        .pipe(take(1))
        .subscribe(() => redirectHandler());
    }
  }, [redirectUrl]);

  return (
    <>
      <div>Redirecting...</div>
    </>
  );
};
