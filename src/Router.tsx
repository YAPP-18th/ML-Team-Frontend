import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MyStudy from './pages/MyStudy';
import Onboarding from './pages/Onboarding';
import Report from './pages/Report';
import Shop from './pages/Shop';
import BeforeStudy from './pages/BeforeStudy';
import Study from './pages/Study';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={MyPage} />
        <Route path="/mystudy" component={MyStudy} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/report" component={Report} />
        <Route path="/shop" component={Shop} />
        <Route path="/wait" component={BeforeStudy} />
        <Route path="/room" component={Study} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
