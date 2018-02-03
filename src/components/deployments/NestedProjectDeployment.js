import React, { Component } from 'react';
import timeago from 'timeago.js';

class NestedProjectDeployment extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const commit = this.props.commit || {};
    const failed = this.props.failed;
    const date = this.props.date;
    const succeeded = this.props.succeeded;

    var badgeClasses = ['sm-badge'];
    var iconClasses = ['status-icon', 'fa'];

    if (failed) {
      badgeClasses.push('failed');
      iconClasses.push('fa-exclamation-circle');
    } else if (succeeded) {
      badgeClasses.push('succeeded');
      iconClasses.push('fa-check-circle');
    } else {
      badgeClasses.push('running');
      iconClasses.push('fa-circle');
    }

    return (
      <div className="nested-project-deployment">
        <div className="sm-deployment-status">
          <div className={badgeClasses.join(' ')}>
            <i className={iconClasses.join(' ')}></i>
          </div>
        </div>
        <div className="sm-deployment-info">
          <div className="lead-info">
            <div className="branch">{commit.branch}</div>
            <div className="timeago">{date ? timeago().format(date * 1000) : null}</div>
          </div>
          <div className="extra-info">
            <div className="commit-msg">{commit.message}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NestedProjectDeployment;