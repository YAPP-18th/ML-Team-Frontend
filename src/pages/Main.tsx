import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OnBoarding from '@pages/onboarding';
import { MainLayout } from '@components/layouts/main/MainLayout';
import { Contents } from '@pages/contents/Contents';
import Login from '@pages/login';
import StudyReady from '@pages/study_ready';
import Study from '@pages/study';

export const Main: React.FC = () => {
  return (
    <>
      <Switch>
        {/*<Route exact={true} path="/" component={Landing} />*/}
        <Route path="/login" component={Login} />
        <Route path="/onboarding" component={OnBoarding} />
        <Route path="/ready" component={StudyReady} />
        <Route path="/study" component={Study} />
        <MainLayout>
          <Route path="/app" component={Contents} />
        </MainLayout>
      </Switch>
    </>
  );
};
