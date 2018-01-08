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
  }

  getButtonContents() {
    return <img src="https://avatars3.githubusercontent.com/u/6496306?s=60&v=4" alt="" className="user-profile-icon"/>;
  }
}

export default ProfileDropdown;