import $ from 'jquery';

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

  copyTextInput(el) {
    el.select();
    document.execCommand('copy');
  }

  copyPasswordInput(value) {
    const $ghost = $('<input>').attr({
      type: 'text',
      value: value,
      class: 'ghost'
    });

    $(document.body).append($ghost);

    $ghost.get(0).select();
    document.execCommand('copy');

    $ghost.remove();
  }
}

function getInstance() {
  if (!Helper) {
    Helper = new H();
  }

  return Helper;
}

export default getInstance();