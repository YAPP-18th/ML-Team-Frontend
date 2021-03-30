import React from 'react';
import { Link } from 'react-router-dom';
const Onboarding = () => {
  return (
    <div>
      <h1>Onboarding Success!</h1>
      <Link to="/mystudy">MyStudy 내 학습</Link>
    </div>
  );
};
export default Onboarding;
