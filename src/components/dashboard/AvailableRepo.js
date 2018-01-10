import React, { Component } from 'react';


class AvailableRepo extends Component {

  render() {
    const repo = this.props.repo || {};

    return (
      <div className="available-repo">
        <div>{repo.name}</div>
      </div>
    );
  }
}

export default AvailableRepo;