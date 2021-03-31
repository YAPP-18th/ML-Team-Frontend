import React from 'react';
import { Link } from 'react-router-dom';
const BeforeStudy = () => {
  return (
    <div>
      <h1>Before Study Success!</h1>
      <Link to="/room">Study 공부 시작</Link>
    </div>
  );
};
export default BeforeStudy;
