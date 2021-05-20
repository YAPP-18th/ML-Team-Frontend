import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MyStudy } from '@pages/AppMain/MyStudy/MyStudy';
import CreateStudy from '@pages/AppMain/MyStudy/CreateStudy';

const MyStudyRoot: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact={true} component={MyStudy} />
      <Route path={`${path}/create`} component={CreateStudy} />
    </Switch>
  );
};

export default MyStudyRoot;
