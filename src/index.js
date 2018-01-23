import './styles/css/index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Session from './utils/Session';

// if not authed and not trying to become authed, then redirect to marketing site
if (!Session.authed() && !document.location.pathname.startsWith('/oauth_redirect')) {
  // TODO: get this from env var
  window.location = 'https://www.tensorci.com';
} else {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));

  registerServiceWorker();
}