import React, { Component } from 'react';

class Deployment extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const uid = this.props.uid;

    return (
      <div className="deployment-dash">{uid}
      </div>
    );
  }
}

export default Deployment;