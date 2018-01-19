import React, { Component } from 'react';

class DeploymentStatusBadge extends Component {
  render() {
    var status = this.props.status;
    const failed = this.props.failed;
    const succeeded = this.props.succeeded;

    var badgeClasses = ['badge'];
    var iconClasses = ['status-icon', 'fa'];

    if (failed) {
      badgeClasses.push('failed');
      iconClasses.push('fa-exclamation');
      status = 'Failed';
    } else if (succeeded) {
      badgeClasses.push('succeeded');
      iconClasses.push('fa-check');
    } else {
      badgeClasses.push('running');
      iconClasses.push('fa-circle');
    }

    return (
      <div className={badgeClasses.join(' ')}>
        <i className={iconClasses.join(' ')}></i>
        <div className="badge-label">{status}</div>
      </div>
    );
  }
}

export default DeploymentStatusBadge;