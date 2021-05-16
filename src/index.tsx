import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from 'twin.macro';
import '@shared/styles/theme.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <GlobalStyles />
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
