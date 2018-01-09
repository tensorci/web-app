import React, { Component } from 'react';
import Header from '../shared/Header';
import Session from '../../utils/Session';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.teamSlug = this.props.match.params.teamSlug;

    if (!this.teamSlug) {
      const user = Session.user();

      if (user && user.username) {
        window.location = '/' + user.username;
      }
    }
  }

  render() {
    return (
      <div id="dashboard">
        <Header teamSlug={this.teamSlug}/>
      </div>
    );
  }
}

export default Dashboard;