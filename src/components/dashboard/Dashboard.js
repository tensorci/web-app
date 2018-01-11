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
      repo: this.props.match.params.repo,
      uid: this.props.match.params.uid,
      meta: this.props.meta || {}
    };

    // if no team specified and one is required, redirect to /<username-as-team>
    if (!this.state.team && !this.state.meta.skipTeam) {
      const user = Session.user();

      if (user && user.username) {
        window.location = '/' + user.username;
      }
    }
  }

  render() {
    return (
      <div id="dashboard">
        <Header team={this.state.team}/>
        <div className="below-header">
          <SideNav appSection={this.state.appSection} team={this.state.team}/>
          <DashContent appSection={this.state.appSection} team={this.state.team} repo={this.state.repo} meta={this.state.meta}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;