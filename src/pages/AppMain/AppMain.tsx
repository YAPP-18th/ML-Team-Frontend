import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Study } from '@pages/AppMain/Study/Study';
import OnBoarding from '@pages/AppMain/OnBoarding/OnBoarding';
import { NotFound } from '@pages/NotFound/NotFound';
import MyStudyRoot from '@pages/AppMain/MyStudy/MyStudyRoot';

export const AppMain: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact={true}>
          <Redirect to={`${path}/mystudy`} />
        </Route>
        <Route path={`${path}/mystudy`} component={MyStudyRoot} />
        <Route path={`${path}/study`} component={Study} />
        <Route path={`${path}/onboarding`} component={OnBoarding} />
        <Route path={`${path}/*`} component={NotFound} />
      </Switch>
    </>
  );
};
