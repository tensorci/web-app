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
        heading: 'User settings',
        href: '/account',
        internal: true,
        onClick: this.toggle
      },
      {
        heading: 'Log out',
        href: '/logout',
        onClick: this.logout
      }
    ];
  }

  logout(e) {
    e.stopPropagation();
    e.preventDefault();

    Ajax.get('/api/provider_user/logout_url', null, (data) => {
      if (data.url) {
        Session.logout();
        window.location = data.url;
      }
    });
  }

  getButtonContents() {
    const user = Session.user();

    if (user && user.icon) {
      return <img src={user.icon} alt="" className="user-profile-icon"/>;
    }
  }
}

export default ProfileDropdown;