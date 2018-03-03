import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import Helper from '../../utils/Helper';
import Session from '../../utils/Session';

class DemoRedirect extends Component {

  constructor(props) {
    super(props);
    const error_redirect = 'https://www.tensorci.com';
    const searchParams = props.location.search;

    if (!searchParams) {
      window.location = error_redirect;
      return;
    }

    // parse search data into a params dict
    const search = props.location.search.substring(1);
    const params = Helper.parseQueryString(search);

    // Get demo token
    const token = params.token;

    if (!token) {
      window.location = error_redirect;
      return;
    }

    Ajax.get('/api/demo/authenticate', { token: token }, (data) => {
      Session.setToStorage('user', data.user);
      Session.setToStorage('teams', data.teams);
      Session.setToStorage('loginInfo', data.login_info);
      Session.setToStorage('on_demo', true);

      setTimeout(() => {
        window.location = '/latticeai/lattice_data_imputation';
      }, 200);
    });
  }

  render() {
    return (
      <div>
        <DashLoadingSpinner/>
      </div>
    );
  }
}

export default DemoRedirect;