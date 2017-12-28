var Helper;

class H {

  parseQueryString(queryString) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split('&');

    for (i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split('=');
      params[temp[0]] = temp[1];
    }

    return params;
  }
}

function getInstance() {
  if (!Helper) {
    Helper = new H();
  }

  return Helper;
}

export default getInstance();