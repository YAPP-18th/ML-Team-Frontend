import React from 'react';
import { Link } from 'react-router-dom';
const MyStudy = () => {
  return (
    <div>
      <h1>MyStudy Success!</h1>
      <Link to="/mystudy">MyStudy 내 학습</Link>
      <Link to="/report">Report 학습레포트</Link>
      <Link to="/shop">Shop 별자리 교환</Link>
      <Link to="/user">User 마이페이지</Link>
      <Link to="/wait">BefroeStudy 공부하러 가기 전</Link>
    </div>
  );
};
export default MyStudy;
