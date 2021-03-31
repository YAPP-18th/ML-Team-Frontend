import React from 'react';
import { Link } from 'react-router-dom';
const Study = () => {
  return (
    <div>
      <h1>Study Success!</h1>
      <Link to="/mystudy">MyStudy 내 학습</Link>
      <Link to="/report">Report 학습레포트</Link>
    </div>
  );
};
export default Study;
