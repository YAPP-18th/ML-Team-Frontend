import React, { useMemo, useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import Login from '@pages/Login/Login';
import ConditionalRoute from '@components/Common/ConditionalRoute';
import { message } from 'antd';
import { useCookies } from 'react-cookie';
// import { StudyInnerRedirect } from '@pages/AppMain/Study/StudyInnerRedirect';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { useHistory } from 'react-router';

// components
import { NotFound } from '@pages/NotFound/NotFound';
import { MyStudy } from '@pages/AppMain/MyStudy/MyStudy';
import { StudyRoom } from '@pages/AppMain/Study/StudyRoom';
import { StudyReady } from '@pages/AppMain/Study/StudyReady';
import { StudyFinish } from '@pages/AppMain/Study/StudyFinish';
import { Report } from '@pages/AppMain/Report/Report';

export const Study: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const appAccessCondition = useMemo(() => {
    return !!cookies?.accessToken && cookies?.accessToken !== '';
  }, [cookies]);
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <ConditionalRoute
          path="/app/mystudy"
          redirectPath="/app/study"
          condition={!appAccessCondition} //스터디룸 입장 권한 여부 요청
          onFalse={() => {
            message.error('공부방 입장 권한이 없습니다.');
            console.log('입장불가');
          }}
        >
          <MyStudy />
        </ConditionalRoute>

        <ConditionalRoute
          path="/app/study"
          redirectPath="/app/mystudy"
          condition={appAccessCondition} //스터디룸 입장 권한 여부 요청
          onFalse={() => {
            console.log('입장권한확인');
            message.error('공부방 입장이 가능한 이용자입니다.');
          }}
        >
          <Switch>
            <Route path={`${path}/ready`} component={StudyReady} />
            <Route path={`${path}/studyroom`} component={StudyRoom} />
            <Route path={`${path}/finish`} component={StudyFinish} />
            {/* <Route path={`${path}/report`} component={Report} /> */}
            <Route path={`${path}/*`} component={NotFound} />
          </Switch>
        </ConditionalRoute>

        <Route path={`${path}/redirect`} component={StudyInnerRedirect} />
      </Switch>
    </>
  );
};

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

//접속하려는 방에 접속할 수 있는지 //접속불가능하면 mystudy로 돌아감
export const StudyInnerRedirect: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const [redirectUrl, setRedirectUrl] = useState<string>();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const redirectType = query.get('type');
    switch (redirectType) {
      case 'study': {
        const id = query.get('id');
        setRedirectUrl(`/app/study/${id}`);
        break;
      }
    }
  }, [query]);

  useEffect(() => {
    if (redirectUrl) {
      const redirectHandler = () => {
        // 스터디룸 입장 권한 여부를 요청하는 내용으로 수정 예정
        const hasAccessToken =
          !!cookies?.accessToken && cookies?.accessToken !== '';

        if (hasAccessToken) {
          history.push(redirectUrl);
        } else {
          history.push('app/mystudy', { redirectUrl }); //권한이 없으면 mystudy로 redirect
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
