import React, { Component } from 'react';
import Helper from '../../utils/Helper';
import Session from '../../utils/Session';

class OAuthRedirect extends Component {

  constructor(props) {
    super(props);

    if (props.location.search) {
      const search = props.location.search.substring(1);
      const searchParams = Helper.parseQueryString(search);

      console.log(searchParams.auth);

      if (searchParams.auth) {
        // Create new user session
        Session.create(searchParams.auth);

        // Redirect to dashboard
        // window.location = '/';
      }
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default OAuthRedirect;