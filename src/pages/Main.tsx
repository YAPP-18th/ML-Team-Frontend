import React, { useMemo } from 'react';
import { Switch } from 'react-router-dom';
import { AppMain } from '@pages/contents/AppMain';
import Login from '@pages/login';
import ConditionalRoute from '@components/common/ConditionalRoute';
import { message } from 'antd';
import { useCookies } from 'react-cookie';

export const Main: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const appAccessCondition = useMemo(() => {
    return !!cookies?.accessToken && cookies?.accessToken !== '';
  }, [cookies]);

  return (
    <>
      <Switch>
        <ConditionalRoute
          path="/login"
          redirectPath="/app"
          condition={!appAccessCondition}
          onFalse={() => {
            message.error('이미 로그인이 되어 있습니다.');
          }}
        >
          <Login />
        </ConditionalRoute>

        <ConditionalRoute
          path="/app"
          redirectPath="/login"
          condition={appAccessCondition}
          onFalse={() => {
            message.error('로그인 정보가 없습니다.');
          }}
        >
          <AppMain />
        </ConditionalRoute>
      </Switch>
    </>
  );
};
