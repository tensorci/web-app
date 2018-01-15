import React, { Component } from 'react';
import Link from '../../utils/Link';
import timeago from 'timeago.js';

class DeploymentListItem extends Component {

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
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const info = this.props.info || {};
    const commit = info.commit || {};
    const statusStyle = this.statusStyleMap[info.status] || {};

    var statusClass = info.status;
    var statusIcon = statusStyle.icon;
    var statusText = statusStyle.text;

    if (info.failed) {
      statusClass = 'failed';
      statusIcon = 'fa fa-exclamation';
      statusText = 'Failed';
    } else if (info.canceled) {
      statusClass = 'canceled';
      statusIcon = 'fa fa-minus';
      statusText = 'Canceled';
    }

    const deploymentLink = '/' + team + '/' + repo + '/' + info.uid;

    return (
      <div className={'deployment ' + statusClass}>
        <div className="status-area">
          <Link href={deploymentLink}>
            <div className={'badge ' + statusClass}>
              <i className={'status-icon ' + statusIcon}></i>
              <div className="badge-label">{statusText}</div>
            </div>
          </Link>
        </div>
        <div className="commit-info">
          <div className="commit-info-inner">
            <div className="commit-info-header">
              <div className="contextual-identifier">
                <Link href={deploymentLink}>{team} / {repo} / {commit.branch}</Link>
              </div>
            </div>
            <div className="recent-commit-msg">
              <div className="recent-user">
                <img src={commit.author_icon} alt="" className="dashboard-icon"/>
              </div>
              <span className="recent-log">{commit.message}</span>
            </div>
          </div>
        </div>
        <div className="metadata">
          <div className="metadata-row timing">
            <span className="metadata-item recent-time start-time">
              <i className="material-icons">today</i>
              <span>{info.created_at ? timeago().format(info.created_at * 1000) : null}</span>
            </span>
            <span className="metadata-item recent-time duration">
              <i className="material-icons">timer</i>
              <span>09:08</span>
            </span>
          </div>
          <div className="metadata-row sha">
            <span className="metadata-item sha">
              <i className="octicon octicon-git-commit"></i>
              <a href={'https://github.com/' + team + '/' + repo + '/commit/' + commit.sha} target="_blank" rel="noopener noreferrer">{commit.sha.slice(0, 7)}</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default DeploymentListItem;