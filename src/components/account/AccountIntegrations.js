import React, { Component } from 'react';
import Session from '../../utils/Session';

class AccountIntegrations extends Component {

  render() {
    return (
      <div className="main-content">
        <div className="account-inner">
          <legend>Account Integrations</legend>
          <div className="card">
            <div className="card-header">
              <div className="title">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/github.svg" alt="Github"/>
              </div>
            </div>
            <div className="card-body">
              <p>Train models and serve predictions from your GitHub repositories.</p>
              <p className="connection-status">Connected to {Session.username()}.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountIntegrations;