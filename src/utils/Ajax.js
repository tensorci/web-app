/*
  Wrapper around whatwg-fetch for making ajax requests

  Usage example (no usage difference between get/post/put/delete):
    import Ajax from '../rel/path/to/Ajax';

    Ajax.get('/api/users', { company: 'My Company' })
      .then((resp) => resp.json()) // unpack json response data
      .then((data) => {
        console.log(data);
      });
 */

import $ from 'jquery';
import Session from './Session';

var Ajax;

class AjaxClass {

  get(url, params) {
    return this.urlEncoded(url, params, 'GET');
  }

  post(url, params) {
    return this.jsonRequst(url, params, 'POST');
  }

  put(url, params) {
    return this.jsonRequst(url, params, 'PUT');
  }

  delete(url, params) {
    return this.urlEncoded(url, params, 'DELETE');
  }

  urlEncoded(url, params, method) {
    if (params) {
      url += ('?' + $.param(params));
    }

    return fetch(url, { method: method, headers: this.defaultHeaders() });
  }

  jsonRequst(url, params, method) {
    var headers = this.defaultHeaders();
    headers['Content-Type'] = 'application/json';

    return fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(params || {})
    });
  }

  defaultHeaders() {
    var headers = {};

    if (Session.authed()) {
      headers = Session.addAuthHeader(headers);
    }

    return headers;
  }
}

function getInstance() {
  if (!Ajax) {
    Ajax = new AjaxClass();
  }

  return Ajax;
}

export default getInstance();