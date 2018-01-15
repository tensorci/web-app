import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Logs from './Logs';
import timeago from 'timeago.js';

class Deployment extends Component {

  constructor(props) {
    super(props);

    this.statusStyleMap = {
      created: {
        text: 'Building',
        icon: 'fa fa-circle'
      },
      train_building: {
        text: 'Building',
        icon: 'fa fa-circle'
      },
      train_building_done: {
        text: 'Deploying to train',
        icon: 'fa fa-circle'
      },
      training: {
        text: 'Training',
        icon: 'fa fa-circle'
      },
      training_done: {
        text: 'Done Training',
        icon: 'fa fa-circle'
      },
      api_building: {
        text: 'Building',
        icon: 'fa fa-circle'
      },
      api_building_done: {
        text: 'Deploying to API',
        icon: 'fa fa-circle'
      },
      predicting: {
        text: 'Predicting',
        icon: 'fa fa-check'
      }
    };

    this.state = {
      status: null,
      failed: false,
      canceled: false,
      createdAt: null,
      commit: {}
    };
  }

  componentDidMount() {
    Ajax.get('/api/deployment', { uid: this.props.uid })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          status: data.status,
          failed: data.failed,
          canceled: data.canceled,
          createdAt: data.created_at,
          commit: data.commit
        });
      });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const uid = this.props.uid;
    const commit = this.state.commit;
    const statusStyle = this.statusStyleMap[this.state.status] || {};

    var statusClass = this.state.status;
    var statusIcon = statusStyle.icon;
    var statusText = statusStyle.text;

    if (this.state.failed) {
      statusClass = 'failed';
      statusIcon = 'fa fa-exclamation';
      statusText = 'Failed';
    } else if (this.state.canceled) {
      statusClass = 'canceled';
      statusIcon = 'fa fa-minus';
      statusText = 'Canceled';
    }

    return (
      <div id="deployment" className="main-body">
        <div className="build-info-v2">
          <div>
            <div className="build-head">
              <div className="build-head-content">
                <div className="summary-header">
                  <div className="build-head-summary-header">
                    <div className="summary-item">
                      <div className={'badge ' + statusClass}>
                        <i className={'status-icon ' + statusIcon}></i>
                        <div className="badge-label">{statusText}</div>
                      </div>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Started:</span>
                      <span>{timeago().format(this.state.created_at)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Triggered by:</span>
                      <a href={'https://github.com/' + commit.author} target="_blank" rel="noopener noreferrer">{commit.author}</a>
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