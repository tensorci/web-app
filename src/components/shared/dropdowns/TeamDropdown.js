import React from 'react';
import Dropdown from './Dropdown';
import TeamDropdownItem from './TeamDropdownItem';
import Session from '../../../utils/Session';

class TeamDropdown extends Dropdown {

  constructor(props) {
    super(props);
  }

  getButtonContents() {
    const teams = Session.teams();

    if (!teams || teams.length === 0) {
      return;
    }

    var selectedTeam, team;
    for (var i = 0; i < teams.length; i++) {
      team = teams[i];

      if (!this.props.selectedTeam || team.slug === this.props.selectedTeam) {
        selectedTeam = team;
        break;
      }
    }

    if (!selectedTeam) {
      selectedTeam = teams[0];
    }

    return [
      <div key={0} className="team-icon">
        <img src={selectedTeam.icon} alt="" className="selected-team-icon"/>
      </div>,
      <div key={1} className="team-name">
        <span className="selected-team-name">{selectedTeam.name}</span>
        <i className="material-icons team-picker-arrow">keyboard_arrow_down</i>
      </div>
    ];
  }

  getItems() {
    const teams = Session.teams();

    if (!teams || teams.length === 0) {
      return;
    }

    var items = [
      <li key={0} className="team-dropdown-menu-item switch-team-text">Switch Team</li>
    ];

    var selected = false;
    teams.forEach((item, i) => {
      selected = item.slug === this.props.selectedTeam;
      items.push(<TeamDropdownItem key={i + 1} team={item} selected={selected} onClick={this.toggle}/>);
    });

    return items;
  }
}

export default TeamDropdown;