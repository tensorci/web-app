import React from 'react';
import Ajax from '../../../utils/Ajax';
import Dropdown from './Dropdown';
import Session from '../../../utils/Session';

class ProfileDropdown extends Dropdown {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.items = [
      {
        'heading': 'User settings',
        'href': '#'
      },
      {
        'heading': 'Log out',
        'href': 'javascript:void(0)',
        'onClick': this.logout
      }
    ];

    this.state = {
      user: this.props.user || {}
    };
  }

  logout() {
    Ajax.get('/api/provider_user/logout_url')
      .then((resp) => resp.json())
      .then((data) => {
        if (data.url) {
          Session.logout();
          window.location = data.url;
        }
      });
  }

  getButtonContents() {
    return <img src={this.state.user.icon} alt="" className="user-profile-icon"/>;
  }
}

export default ProfileDropdown;