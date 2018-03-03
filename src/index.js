import './styles/css/index.css';

import App from './App';
import Ajax from './utils/Ajax';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Session from './utils/Session';

function mountToRoot() {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));

  registerServiceWorker();
}

// if not authed and not trying to become authed, then redirect to marketing site
if (!Session.authed() && !document.location.pathname.startsWith('/oauth_redirect') && !document.location.pathname.startsWith('/demo')) {
  // TODO: get this from env var
  window.location = 'https://www.tensorci.com';
} else if (Session.authed() && Session.hasIncompleteLocalStorage()) {
  // cookie exists but localStorage not so much, so refetch localStorage info from BE.
  Ajax.get('/api/provider_user/storage_info', null, (data) => {
    Session.setToStorage('user', data.user);
    Session.setToStorage('teams', data.teams);
    Session.setToStorage('loginInfo', data.login_info);

    setTimeout(() => {
      mountToRoot();
    }, 10);
  });
} else {
  mountToRoot();
}