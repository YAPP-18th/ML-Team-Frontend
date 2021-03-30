import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div>
      <h1>Login Success!</h1>
      <Link to="/onboarding">Onboarding</Link>
      <Link to="/mystudy">My Study 내 학습</Link>
    </div>
  );
};
export default Login;
