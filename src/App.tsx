import React from 'react';
import 'twin.macro';
import './App.css';
import { Main } from '@pages/Main';
import { RecoilRoot } from 'recoil';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
};

export default App;
