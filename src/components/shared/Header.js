import React, { Component } from 'react';
import SupportDropdown from './dropdowns/SupportDropdown';
import ProfileDropdown from './dropdowns/ProfileDropdown';
import TeamDropdown from './dropdowns/TeamDropdown';
import UpdatesDropdown from './dropdowns/UpdatesDropdown';
import Session from '../../utils/Session';

class Header extends Component {

  constructor(props) {
    super(props);

    this.setTeamDropdownRef = this.setTeamDropdownRef.bind(this);
    this.setProfileDropdownRef = this.setProfileDropdownRef.bind(this);

    this.state = {
      user: Session.user(),
      teams: Session.teams()
    };
  }

  setTeamDropdownRef(ref) {
    this.teamDropdown = ref;
  }

  setProfileDropdownRef(ref) {
    this.profileDropdown = ref;
  }

  render() {
    const team = this.props.team;

    return (
      <div className="header">
        <div className="nav-container">
          <div className="nav">
            <ul className="nav-options collapsing-nav">
              <TeamDropdown classes={['team-dropdown']} dropdownMenuClasses={['team-menu']} teams={this.state.teams} selectedTeam={team} ref={this.setTeamDropdownRef}/>
            </ul>
            <a href="/" className="logoLink">
              <i className="ico">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/icon.svg" alt="" className="logo"/>
              </i>
            </a>
            <ul className="nav-options">
              <UpdatesDropdown title="Updates" classes={['updates-dropdown']}/>
              <SupportDropdown title="Support" classes={['support-dropdown']}/>
              <ProfileDropdown classes={['profile-dropdown']} user={this.state.user} ref={this.setProfileDropdownRef}/>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
