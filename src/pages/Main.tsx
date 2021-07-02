import React, { useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppMain } from '@pages/AppMain/AppMain';
import Login from '@pages/Login/Login';
import { Landing } from './Landing';
import ConditionalRoute from '@components/atoms/ConditionalRoute';
import { message } from 'antd';
import { InnerRedirect } from '@pages/InnerRedirect/InnerRedirect';
import useAccessToken from '../hooks/useAccessToken';

export const Main: React.FC = () => {
  const [accessToken] = useAccessToken();
  const appAccessCondition = useMemo(() => {
    return !!accessToken && accessToken !== '';
  }, [accessToken]);

  return (
    <>
      <Switch>
        <Route path="/landing" component={Landing} />
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
        <Route path="/redirect" component={InnerRedirect} />
        <Route path="*">
          {/* <Redirect to="/app" /> */}
          <Redirect to="/landing" />
        </Route>
      </Switch>
    </>
  );
};
