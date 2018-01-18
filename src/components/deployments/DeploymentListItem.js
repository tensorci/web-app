import React, { Component } from 'react';
import DeploymentStatusBadge from './DeploymentStatusBadge';
import Link from '../../utils/Link';
import timeago from 'timeago.js';

class DeploymentListItem extends Component {

  formatSecDuration(duration) {
    var seconds = parseInt(duration % 60);
    var minutes = parseInt((duration / 60) % 60);
    var hours = parseInt((duration / (60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const info = this.props.info || {};
    const commit = info.commit || {};

    const deploymentLink = '/' + team + '/' + repo + '/' + info.uid;

    return (
      <div className="deployment">
        <div className="status-area">
          <Link href={deploymentLink}>
            <DeploymentStatusBadge status={info.readable_status} failed={info.failed} succeeded={info.succeeded}/>
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
              <span>{info.date ? timeago().format(info.date * 1000) : null}</span>
            </span>
            <span className="metadata-item recent-time duration">
              <i className="material-icons">timer</i>
              <span>{this.formatSecDuration(info.train_duration_sec)}</span>
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