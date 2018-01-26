import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Helper from '../../utils/Helper';
import Session from '../../utils/Session';

class OAuthRedirect extends Component {

  constructor(props) {
    super(props);

    // ensure we have params
    if (props.location.search) {
      // parse search data into a params dict
      const search = props.location.search.substring(1);
      const params = Helper.parseQueryString(search);

      // get the params we care about
      const token = params.auth;
      const username = params.username;
      const icon = params.icon;

      // token must exist to before we take any further action.
      if (token) {
        // wipe any existing Session
        Session.logout();

        // Create new user session
        Session.create(token);

        // if username and icon exist, set user to local storage
        Session.setToStorage('user', {
          username: username,
          icon: icon
        });

        // wait a hot sec to ensure Session is up to date
        setTimeout(() => {
          // Get teams for the user
          Ajax.get('/api/provider_user/storage_info')
            .then((resp) => resp.json())
            .then((data) => {
              // set teams to local storage if they exist
              Session.setToStorage('teams', data.teams);

              // set any other important login info about the user
              Session.setToStorage('loginInfo', data.login_info);

              // wait another hot sec
              setTimeout(() => {
                // redirect to username team
                window.location = '/' + username;
              }, 200);
            });
        }, 200);
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