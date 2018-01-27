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
import banner from './Banner';
import Session from './Session';

var Ajax;

class AjaxClass {

  constructor() {
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    this.urlEncoded = this.urlEncoded.bind(this);
    this.jsonRequst = this.jsonRequst.bind(this);
    this.defaultHeaders = this.defaultHeaders.bind(this);
    this.requestSucceeded = this.requestSucceeded.bind(this);
  }

  get(url, params, errMsg) {
    return this.urlEncoded(url, params, 'GET', errMsg);
  }

  post(url, params, errMsg) {
    return this.jsonRequst(url, params, 'POST', errMsg);
  }

  put(url, params, errMsg) {
    return this.jsonRequst(url, params, 'PUT', errMsg);
  }

  delete(url, params, errMsg) {
    return this.urlEncoded(url, params, 'DELETE', errMsg);
  }

  urlEncoded(url, params, method, errMsg) {
    if (params) {
      url += ('?' + $.param(params));
    }

    return fetch(url, {
      method: method,
      headers: this.defaultHeaders()
    }).then((resp) => {
      if (this.requestSucceeded(resp)) {
        return resp.json();
      } else if (errMsg) {
        banner.error(errMsg);
      }
    });
  }

  jsonRequst(url, params, method, errMsg) {
    var headers = this.defaultHeaders();
    headers['Content-Type'] = 'application/json';

    return fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(params || {})
    }).then((resp) => {
      if (this.requestSucceeded(resp)) {
        return resp.json();
      } else if (errMsg) {
        banner.error(errMsg);
      }
    });
  }

  defaultHeaders() {
    var headers = {};

    if (Session.authed()) {
      headers = Session.addAuthHeader(headers);
    }

    return headers;
  }

  requestSucceeded(resp) {
    return resp.status === 200 || resp.status === 201;
  }
}

function getInstance() {
  if (!Ajax) {
    Ajax = new AjaxClass();
  }

  return Ajax;
}

export default getInstance();