import Cookies from 'universal-cookie';

var Session;

class Sess {

  constructor() {
    this.cookieName = 'tensorci-user';
    this.authHeader = 'TensorCI-Api-Token';
    this.cookies = new Cookies();
  }

  create(token) {
    this.setCookie(this.cookieName, token);
  }

  destroy() {
    this.deleteCookie(this.cookieName);
  }

  authed() {
    return !!this.getCookie(this.cookieName);
  }

  user() {
    return this.getFromStorage('user');
  }

  teams() {
    return this.getFromStorage('teams');
  }

  loginInfo() {
    return this.getFromStorage('loginInfo');
  }

  username() {
    return (this.user() || {}).username;
  }

  isAdmin() {
    return !!(this.user() || {}).isAdmin;
  }

  getCookie(name) {
    return this.cookies.get(name);
  }

  setCookie(name, value) {
    const days_til_expiration = 30;

    var date = new Date();
    date.setTime(date.getTime() + (days_til_expiration * 24 * 60 * 60 * 1000));

    this.cookies.set(name, value, { path: '/', expires: date });
  }

  deleteCookie(name) {
    this.cookies.remove(name);
  }

  setToStorage (key, value) {
    var val;

    try {
      val = JSON.stringify(value);
    } catch (e) {
      val = value;
    }

    localStorage.setItem(key, val);
  }

  getFromStorage (key) {
    var item;
    var data = localStorage.getItem(key);

    try {
      item = JSON.parse(data);
    } catch (e) {
      item = data;
    }

    return item;
  }

  deleteFromStorage (key) {
    localStorage.removeItem(key);
  }

  addAuthHeader(headers) {
    headers = headers || {};
    headers[this.authHeader] = this.getCookie(this.cookieName);
    return headers;
  }

  logout() {
    this.destroy();
    this.deleteFromStorage('user');
    this.deleteFromStorage('teams');
  }

  isFirstLogin() {
    return (this.loginInfo() || {}).firstLogin || false;
  }
}

function getInstance() {
  if (!Session) {
    Session = new Sess();
  }
  
  return Session;
}

export default getInstance();