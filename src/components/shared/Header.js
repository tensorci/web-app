import React, { Component } from 'react';
import SupportDropdown from './dropdowns/SupportDropdown';
import ProfileDropdown from './dropdowns/ProfileDropdown';
import TeamDropdown from './dropdowns/TeamDropdown';
import UpdatesDropdown from './dropdowns/UpdatesDropdown';
import Session from '../../utils/Session';
import Ajax from '../../utils/Ajax';

class Header extends Component {

  constructor(props) {
    super(props);
    this.setTeamDropdownRef = this.setTeamDropdownRef.bind(this);
    this.setProfileDropdownRef = this.setProfileDropdownRef.bind(this);
  }

  setTeamDropdownRef(ref) {
    this.teamDropdown = ref;
  }

  setProfileDropdownRef(ref) {
    this.profileDropdown = ref;
  }

  componentDidMount() {
    const user = Session.user();
    const teams = Session.teams();

    if (user && teams) {
      this.profileDropdown.setState({ user: user });
      this.teamDropdown.setState({ teams: teams });
    } else {
      Ajax.get('/api/provider_user/storage_info')
        .then((resp) => resp.json())
        .then((data) => {
          Session.setToStorage('user', data.user);
          Session.setToStorage('teams', data.teams);

          if (!this.props.team && data.user && data.user.username) {
            window.location = '/' + data.user.username;
          }

          this.profileDropdown.setState({ user: data.user });
          this.teamDropdown.setState({ teams: data.teams });
        });
    }
  }

  render() {
    const team = this.props.team;

    return (
      <div className="header">
        <div className="nav-container">
          <div className="nav">
            <ul className="nav-options collapsing-nav">
              <TeamDropdown classes={['team-dropdown']} dropdownMenuClasses={['team-menu']} selectedTeam={team} ref={this.setTeamDropdownRef}/>
            </ul>
            <a href="/" className="logoLink">
              <i className="ico">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/icon.svg" alt="" className="logo"/>
              </i>
            </a>
            <ul className="nav-options">
              <UpdatesDropdown title="Updates" classes={['updates-dropdown']}/>
              <SupportDropdown title="Support" classes={['support-dropdown']}/>
              <ProfileDropdown classes={['profile-dropdown']} ref={this.setProfileDropdownRef}/>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
