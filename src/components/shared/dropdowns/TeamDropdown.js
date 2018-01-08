import React from 'react';
import Dropdown from './Dropdown';
import TeamDropdownItem from './TeamDropdownItem';

class TeamDropdown extends Dropdown {

  constructor(props) {
    super(props);

    // Hardcoding for now
    this.items = [
      {
        name: 'PulseSoftwareInc',
        slug: 'pulsesoftwareinc',
        icon: 'https://avatars3.githubusercontent.com/u/6098534?s=40&v=4',
        provider: 'github'
      },
      {
        name: 'whittlbc',
        slug: 'whittlbc',
        icon: 'https://avatars3.githubusercontent.com/u/6496306?s=40&v=4',
        provider: 'github'
      },
      {
        name: 'gmaher',
        slug: 'gmaher',
        icon: 'https://avatars3.githubusercontent.com/u/11987969?s=40&v=4',
        provider: 'github'
      },
    ];
  }

  getButtonContents() {
    return [
      <div key={0} className="team-icon">
        <img src="https://avatars3.githubusercontent.com/u/6098534?s=60&v=4" alt="" className="selected-team-icon"/>
      </div>,
      <div key={1} className="team-name">
        <span className="selected-team-name">PulseSoftwareInc</span>
        <i className="material-icons team-picker-arrow">keyboard_arrow_down</i>
      </div>
    ];
  }

  getItems() {
    var items = [
      <li key={0} className="team-dropdown-menu-item switch-team-text">Switch Team</li>
    ];

    this.items.forEach((item, i) => {
      // TODO: set selected based on which one's actually selected...
      items.push(<TeamDropdownItem key={i + 1} team={item} selected={i === 0} />);
    });

    return items;
  }
}

export default TeamDropdown;