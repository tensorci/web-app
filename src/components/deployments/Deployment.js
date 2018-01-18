import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DeploymentStatusBadge from './DeploymentStatusBadge';
import Logs from './Logs';
import timeago from 'timeago.js';

class Deployment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: null,
      failed: false,
      succeeded: false,
      date: null,
      triggeredBy: null,
      commit: {}
    };
  }

  componentDidMount() {
    Ajax.get('/api/deployment', { uid: this.props.uid })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          status: data.readable_status,
          failed: data.failed,
          succeeded: data.succeeded,
          date: data.date,
          triggeredBy: data.triggered_by,
          commit: data.commit
        });
      });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const uid = this.props.uid;
    const commit = this.state.commit;

    return (
      <div id="deployment" className="main-body">
        <div className="build-info-v2">
          <div>
            <div className="build-head">
              <div className="build-head-content">
                <div className="summary-header">
                  <div className="build-head-summary-header">
                    <div className="summary-item">
                      <DeploymentStatusBadge status={this.state.status} failed={this.state.failed} succeeded={this.state.succeeded}/>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Started:</span>
                      <span>{this.state.date ? timeago().format(this.state.date * 1000) : null}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Triggered by:</span>
                      <a href={'https://github.com/' + this.state.triggeredBy} target="_blank" rel="noopener noreferrer">{this.state.triggeredBy}</a>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="build-head-commits">
                      <div className="heading">Commit</div>
                      <div className="build-commits">
                        <div className="build-commits-list">
                          <div className="commit-line">
                            <span className="metadata-item">
                              <a href={'https://github.com/' + commit.author} target="_blank" rel="noopener noreferrer">{commit.author}</a>
                            </span>
                            <i className="octicon octicon-git-commit"></i>
                            <a href={'https://github.com/' + team + '/' + repo + '/commit/' + commit.sha} className="metadata-item sha-one" target="_blank" rel="noopener noreferrer">{(commit.sha || '').slice(0, 7)}</a>
                            <span className="commit-message">{commit.message}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Logs team={team} repo={repo} uid={uid}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Deployment;