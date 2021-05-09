import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import OnBoarding from '@pages/onboarding';
import { MainLayout } from '@components/layouts/main/MainLayout';
import { Contents } from '@pages/contents/Contents';

export const Main: React.FC = () => {
  return (
    <>
      <Switch>
        {/*<Route exact={true} path="/" component={Landing} />*/}
        <Route path="/login" component={Login} />
        <Route path="/onboarding" component={OnBoarding} />
        <MainLayout>
          <Route path="/app" component={Contents} />
        </MainLayout>
      </Switch>
    </>
  );
};
