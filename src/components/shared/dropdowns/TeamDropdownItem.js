import React, { Component } from 'react';

class TeamDropdownItem extends Component {

  constructor(props) {
    super(props);
    this.getLinkClasses = this.getLinkClasses.bind(this);
  }

  getLinkClasses() {
    var classes = ['team-dropdown-menu-item'];

    if (this.props.selected) {
      classes.push('selected-team');
    }

    return classes.join(' ');
  }

  render() {
    const team = this.props.team || {};

    return (
      <li>
        <a href={'/' + team.slug} className={this.getLinkClasses()}>
          <span className="team-icon-and-name">
            <span className="leading-dot">●</span>
            <img src={team.icon} alt="" className="team-icon" />
            <span className="team-name">{team.name}</span>
          </span>
          <i className={'provider-icon fa fa-' + team.provider}></i>
        </a>
      </li>
    );
  }
}

export default TeamDropdownItem;