import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import OnBoarding from '@pages/onboarding';

export const Main: React.FC = () => {
  return (
    <>
      <Switch>
        {/*<Route exact={true} path="/" component={Landing} />*/}
        <Route path="/login" component={Login} />
        <Route path="/onboarding" component={OnBoarding} />
      </Switch>
    </>
  );
};
