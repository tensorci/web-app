import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';

class ProjectCreds extends Component {

  constructor(props) {
    super(props);
    this.toggleSecretVisibility = this.toggleSecretVisibility.bind(this);
    this.regenSecret = this.regenSecret.bind(this);

    this.state = {
      clientId: '',
      clientSecret: '',
      showSecret: false
    };
  }

  componentDidMount() {
    const payload = {
      team: this.props.team,
      repo: this.props.repo
    };

    Ajax.get('/api/repo/creds', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          clientId: data.client_id,
          clientSecret: data.client_secret
        });
      });
  }

  toggleSecretVisibility() {
    this.setState({ showSecret: !this.state.showSecret });
  }

  regenSecret() {
    const payload = {
      team: this.props.team,
      repo: this.props.repo
    };

    Ajax.put('/api/repo/secret', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          clientSecret: data.client_secret,
          showSecret: true
        });
      });
  }

  render() {
    return (
      <div className="main-content">
        <div className="project-settings-inner">
          <legend>Project Credentials</legend>
          <div className="card">
            <div className="card-header">
              <div className="title">Client ID & Client Secret</div>
            </div>
            <div className="card-body">
              <p>The following credentials are required to fetch model predictions from this project's API, as well update its datasets programmatically.</p>
              <p>Using the <a href="https://github.com/tensorci/tensorci-client" target="_blank" rel="noopener noreferrer">Python TensorCI API Client Library</a> is the quickest way to get up and running interacting with your API.</p>
              <div className="form">
                <div className="field">
                  <div className="field-wrapper">
                    <label>Client ID</label>
                    <div className="field">
                      <input className="cred" type="text" value={this.state.clientId} autoComplete="off"/>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-wrapper">
                    <label>Client Secret</label>
                    <div className="field">
                      <input className="cred" type={this.state.showSecret ? 'text' : 'password'} value={this.state.clientSecret} autoComplete="off"/>
                      <button className="cred-action-btn" onClick={this.toggleSecretVisibility}>{this.state.showSecret ? 'Hide' : 'Show'}</button>
                      <button className="cred-action-btn" onClick={this.regenSecret}>Regenerate</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectCreds;