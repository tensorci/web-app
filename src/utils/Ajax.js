/*
Wrapper around whatwg-fetch for making ajax requests

Usage example (no usage difference between get/post/put/delete):

import Ajax from '../rel/path/to/Ajax';

Ajax.get('/api/users', { company: 'My Company' }, (data, failed) => {
  console.log(response_json_data);
});
*/

import $ from 'jquery';
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
    this.handleResponse = this.handleResponse.bind(this);
  }

  get(url, params, cb) {
    return this.urlEncoded(url, params, 'GET', cb);
  }

  post(url, params, cb) {
    return this.jsonRequst(url, params, 'POST', cb);
  }

  put(url, params, cb) {
    return this.jsonRequst(url, params, 'PUT', cb);
  }

  delete(url, params, cb) {
    return this.urlEncoded(url, params, 'DELETE', cb);
  }

  urlEncoded(url, params, method, cb) {
    if (params) {
      url += ('?' + $.param(params));
    }

    fetch(url, {
      method: method,
      headers: this.defaultHeaders()
    }).then((resp) => {
      this.handleResponse(resp, cb);
    });
  }

  jsonRequst(url, params, method, cb) {
    var headers = this.defaultHeaders();
    headers['Content-Type'] = 'application/json';

    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(params || {})
    }).then((resp) => {
      this.handleResponse(resp, cb);
    });
  }

  handleResponse(resp, cb) {
    if (!cb) {
      return;
    }

    const succeeded = this.requestSucceeded(resp);

    if (succeeded) {
      resp.json().then((data) => {
        cb(data);
      });
    } else {
      const data = null;
      const failed = true;
      cb(data, failed);
    }
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