import React, { useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppMain } from '@pages/AppMain/AppMain';
import Login from '@pages/Login/Login';
import ConditionalRoute from '@components/Common/ConditionalRoute';
import { message } from 'antd';
import { useCookies } from 'react-cookie';
import { NotFound } from '@pages/NotFound/NotFound';

export const Main: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const appAccessCondition = useMemo(() => {
    return !!cookies?.accessToken && cookies?.accessToken !== '';
  }, [cookies]);

  return (
    <>
      <Switch>
        <ConditionalRoute
          path="/auth"
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
          redirectPath="/auth"
          condition={appAccessCondition}
          onFalse={() => {
            message.error('로그인 정보가 없습니다.');
          }}
        >
          <AppMain />
        </ConditionalRoute>
        <Route path="*">
          <Redirect to="/app" />
        </Route>
      </Switch>
    </>
  );
};
