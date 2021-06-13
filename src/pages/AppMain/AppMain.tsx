import React, { useEffect, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Study } from '@pages/AppMain/Study/Study';
import OnBoarding from '@pages/AppMain/OnBoarding/OnBoarding';
import { NotFound } from '@pages/NotFound/NotFound';
import MyStudyRoot from '@pages/AppMain/MyStudy/MyStudyRoot';
import useUser from '../../hooks/useUser';
import { useHistory } from 'react-router';
import { Report } from '@pages/AppMain/Report/Report';
import { NoReport } from '@pages/AppMain/Report/NoReport';
import { message } from 'antd';
import ConditionalRoute from '@components/Common/ConditionalRoute';

export const AppMain: React.FC = () => {
  const { path } = useRouteMatch();
  const user = useUser();
  const history = useHistory();
  const userFetchStatus = useMemo(() => {
    return user.error?.response?.status;
  }, [user]);

  useEffect(() => {
    // 403 오류 발생 시 온보딩 화면으로 이동
    if (userFetchStatus === 403) {
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

        <ConditionalRoute
          path={`${path}/onboarding`}
          redirectPath={`${path}`}
          condition={userFetchStatus === 403}
        >
          <OnBoarding />
        </ConditionalRoute>
        <Route path={`${path}/study`} component={Study} />
        <Route path={`${path}/noreport`} component={NoReport} />
        <Route path={`${path}/report`} component={Report} />
        <Route path={`${path}/*`} component={NotFound} />
      </Switch>
    </>
  );
};
