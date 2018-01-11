import React from 'react';
import Dropdown from './Dropdown';
import TeamDropdownItem from './TeamDropdownItem';

class TeamDropdown extends Dropdown {

  constructor(props) {
    super(props);

    this.state = {
      teams: this.props.teams || []
    };
  }

  getButtonContents() {
    if (this.state.teams.length === 0) {
      return;
    }

    var selectedTeam, team;
    for (var i = 0; i < this.state.teams.length; i++) {
      team = this.state.teams[i];

      if (!this.props.selectedTeam || team.slug === this.props.selectedTeam) {
        selectedTeam = team;
        break;
      }
    }

    if (!selectedTeam) {
      selectedTeam = this.state.teams[0];
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
    var items = [
      <li key={0} className="team-dropdown-menu-item switch-team-text">Switch Team</li>
    ];

    var selected = false;
    this.state.teams.forEach((item, i) => {
      selected = item.slug === this.props.selectedTeam;
      items.push(<TeamDropdownItem key={i + 1} team={item} selected={selected} />);
    });

    return items;
  }
}

export default TeamDropdown;