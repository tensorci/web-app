import React from 'react';
import Dropdown from './Dropdown';

class ProfileDropdown extends Dropdown {

  constructor(props) {
    super(props);

    this.items = [
      {
        'heading': 'User settings',
        'href': '#'
      },
      {
        'heading': 'Log out',
        'href': '#'
      }
    ];

    this.state = {
      user: this.props.user || {}
    };
  }

  getButtonContents() {
    return <img src={this.state.user.icon} alt="" className="user-profile-icon"/>;
  }
}

export default ProfileDropdown;