import React from 'react';
import ReactDOM from 'react-dom';
import Battle from './battle';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <Battle />
  </CookiesProvider>,
  document.getElementById('root')
);
