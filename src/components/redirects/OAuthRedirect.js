import React, { Component } from 'react';
import Helper from '../../utils/Helper';
import Session from '../../utils/Session';

class OAuthRedirect extends Component {

  constructor(props) {
    super(props);

    if (props.location.search) {
      const search = props.location.search.substring(1);
      const searchParams = Helper.parseQueryString(search);

      if (searchParams.auth) {
        // Create new user session
        Session.create(searchParams.auth);

        // setTimeout()
        var url = '/';

        if (searchParams.username) {
          url += searchParams.username;
        }

        // Redirect to dashboard
        window.location = url;
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