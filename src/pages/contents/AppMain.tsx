import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MyStudy } from '@pages/contents/my-study/MyStudy';
import { MainLayout } from '@components/layouts/main/MainLayout';
import Study from '@pages/study';
import OnBoarding from '@pages/onboarding';

export const AppMain: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <MainLayout>
          <Route path={`${path}/mystudy`} component={MyStudy} />
        </MainLayout>

        <Route path={`${path}/study`} component={Study} />
        <Route path={`${path}/onboarding`} component={OnBoarding} />
      </Switch>
    </>
  );
};
