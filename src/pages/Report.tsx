import React from 'react';
import { Link } from 'react-router-dom';
const Report = () => {
  return (
    <div>
      <h1>Report Success!</h1>
      <Link to="/mystudy">MyStudy 내 학습</Link>
      <Link to="/report">Report 학습레포트</Link>
      <Link to="/shop">Shop 별자리 교환</Link>
      <Link to="/user">User 마이페이지</Link>
    </div>
  );
};
export default Report;
