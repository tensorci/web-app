import React, { Component } from 'react';
import DashContent from './DashContent';
import Header from '../shared/Header';
import Session from '../../utils/Session';
import SideNav from '../shared/SideNav';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appSection: this.props.appSection,
      team: this.props.match.params.team,
      repo: this.props.match.params.repo
    };

    // if no team specified, redirect to /<username-as-team>
    if (!this.state.team) {
      const user = Session.user();

      if (user && user.username) {
        History.push('/' + user.username);
      }
    }
  }

  render() {
    return (
      <div id="dashboard">
        <Header team={this.state.team}/>
        <div className="below-header">
          <SideNav selected={this.state.appSection}/>
          <DashContent appSection={this.state.appSection} team={this.state.team} repo={this.state.repo}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;