import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MyStudy } from '@pages/contents/my-study/MyStudy';

export const Contents: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}/mystudy`} component={MyStudy} />
      </Switch>
    </>
  );
};
