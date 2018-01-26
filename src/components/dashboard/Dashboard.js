import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashContent from './DashContent';
import Header from '../shared/Header';
import Session from '../../utils/Session';
import SetBasicAuthPwModal from '../shared/modals/SetBasicAuthPwModal';
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

  componentDidMount() {
    // If this is the user's first login and he hasn't seen the basic auth login prompt yet, show it.
    if (Session.isFirstLogin() && !Session.seenBasicAuthPrompt()) {
      setTimeout(() => {
        // Show the modal
        this.basicAuthPwModal.show();

        // Register that the prompt has been seen on the FE.
        var loginInfo = Session.loginInfo();
        loginInfo.seen_basic_auth_prompt = true;
        Session.setToStorage('loginInfo', loginInfo);

        // Register that the prompt has been seen on the BE.
        Ajax.put('/api/user', {
          seen_basic_auth_prompt: true
        });
      }, 1000);
    }
  }

  render() {
    return (
      <div id="dashboard">
        <Header team={this.state.team}/>
        <div className="below-header">
          <SideNav appSection={this.state.appSection} team={this.state.team}/>
          <DashContent
            appSection={this.state.appSection}
            team={this.state.team}
            repo={this.state.repo}
            uid={this.state.uid}
            meta={this.state.meta}/>
        </div>
        <SetBasicAuthPwModal ref={(r) => { this.basicAuthPwModal = r; }}>
          Thanks for joining TensorCI! You should go ahead and set your basic auth password so that you can log in via the command line as well.
        </SetBasicAuthPwModal>
      </div>
    );
  }
}

export default Dashboard;