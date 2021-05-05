import React from 'react';
import 'twin.macro';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Main } from '@pages/Main';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
};

export default App;
