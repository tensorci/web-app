import React, { Component } from 'react';

class StatusStage extends Component {
  render() {
    const data = this.props.data || {};

    return (
      <div className="build-output">
        <div className="action-header contents success">
          <div className="ah-wrapper">
            <div className="ah-wrapper-header status-stage">
              <div className="button contents">
                <i className="material-icons">check_circle</i>
              </div>
              <div className="command contents">
                <span className="stage-name">{data.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatusStage;