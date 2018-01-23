import React, { Component } from 'react';
import SupportDropdown from './dropdowns/SupportDropdown';
import ProfileDropdown from './dropdowns/ProfileDropdown';
import TeamDropdown from './dropdowns/TeamDropdown';
import UpdatesDropdown from './dropdowns/UpdatesDropdown';

class Header extends Component {
  render() {
    const team = this.props.team;

    return (
      <div className="header">
        <div className="nav-container">
          <div className="nav">
            <ul className="nav-options collapsing-nav">
              <TeamDropdown classes={['team-dropdown']} dropdownMenuClasses={['team-menu']} selectedTeam={team}/>
            </ul>
            <a href="/" className="logoLink">
              <i className="ico">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/icon.svg" alt="" className="logo"/>
              </i>
            </a>
            <ul className="nav-options">
              <UpdatesDropdown title="Updates" classes={['updates-dropdown']}/>
              <SupportDropdown title="Support" classes={['support-dropdown']}/>
              <ProfileDropdown classes={['profile-dropdown']}/>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
