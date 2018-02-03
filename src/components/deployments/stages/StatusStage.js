import React, { Component } from 'react';

class StatusStage extends Component {

  constructor(props) {
    super(props);
    this.getActionBtns = this.getActionBtns.bind(this);
  }

  getActionBtns(data, isCurrentStage, team, repo, uid, intent) {}

  render() {
    const data = this.props.data || {};
    const current = this.props.current;
    const team = this.props.team;
    const repo = this.props.repo;
    const uid = this.props.uid;
    const intent = this.props.intent;

    const actionButtons = this.getActionBtns(data, current, team, repo, uid, intent);
    const actionButtonsExist = actionButtons && actionButtons.length > 0;

    return (
      <div className="build-output">
        <div className="action-header contents success">
          <div className="ah-wrapper">
            <div className="ah-wrapper-header status-stage">
              <div className="button contents">
                <i className="material-icons">check_circle</i>
              </div>
              <div className={'command contents' + (actionButtonsExist ? ' with-buttons' : '')}>
                <span className="stage-name">{data.name}</span>
                <div className="right-side">{actionButtons}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatusStage;