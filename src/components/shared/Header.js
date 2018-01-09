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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="logo"><path d="M50,0C26.703,0,7.127,15.936,1.576,37.5c-0.049,0.191-0.084,0.389-0.084,0.595c0,1.315,1.066,2.381,2.381,2.381h20.16c0.96,0,1.783-0.572,2.159-1.391c0,0,0.03-0.058,0.041-0.083C30.391,30.033,39.465,23.809,50,23.809c14.464,0,26.19,11.726,26.19,26.19c0,14.465-11.726,26.19-26.19,26.19c-10.535,0-19.609-6.225-23.767-15.192c-0.011-0.026-0.041-0.082-0.041-0.082c-0.376-0.82-1.199-1.392-2.16-1.392H3.874c-1.315,0-2.381,1.066-2.381,2.38c0,0.206,0.035,0.406,0.084,0.597C7.127,84.063,26.703,100,50,100c27.614,0,50-22.387,50-50C100,22.385,77.614,0,50,0z" className="turn"></path><path d="M38.096000000000004,50a11.904,11.904 0 1,0 23.808,0a11.904,11.904 0 1,0 -23.808,0" className="circle"></path></svg>
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
