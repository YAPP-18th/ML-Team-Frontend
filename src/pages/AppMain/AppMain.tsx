import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { MyStudy } from '@pages/AppMain/MyStudy/MyStudy';
import Study from '@pages/AppMain/Study/Study';
import OnBoarding from '@pages/AppMain/OnBoarding/OnBoarding';
import { NotFound } from '@pages/NotFound/NotFound';

export const AppMain: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact={true}>
          <Redirect to={`${path}/mystudy`} />
        </Route>
        <Route path={`${path}/mystudy`} component={MyStudy} />
        <Route path={`${path}/study`} component={Study} />
        <Route path={`${path}/onboarding`} component={OnBoarding} />
        <Route path={`${path}/*`} component={NotFound} />
      </Switch>
    </>
  );
};
