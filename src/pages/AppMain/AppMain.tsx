import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Study } from '@pages/AppMain/Study/Study';
import OnBoarding from '@pages/AppMain/OnBoarding/OnBoarding';
import { NotFound } from '@pages/NotFound/NotFound';
import MyStudyRoot from '@pages/AppMain/MyStudy/MyStudyRoot';
import useUser from '../../hooks/useUser';
import { useHistory } from 'react-router';
import { Report } from '@pages/AppMain/Report/Report';
import { NoReport } from '@pages/AppMain/Report/NoReport';

export const AppMain: React.FC = () => {
  const { path } = useRouteMatch();
  const user = useUser();
  const history = useHistory();

  useEffect(() => {
    // 403 오류 발생 시 온보딩 화면으로 이동
    if (user.error?.response?.status === 403) {
      history.replace('/app/onboarding');
    }
  }, [user]);

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact={true}>
          <Redirect to={`${path}/mystudy`} />
        </Route>
        <Route path={`${path}/mystudy`} component={MyStudyRoot} />
        <Route path={`${path}/study`} component={Study} />
        <Route path={`${path}/noreport`} component={NoReport} />
        <Route path={`${path}/report`} component={Report} />
        <Route path={`${path}/onboarding`} component={OnBoarding} />
        <Route path={`${path}/*`} component={NotFound} />
      </Switch>
    </>
  );
};
