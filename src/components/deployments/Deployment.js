import React, { Component } from 'react';

class Deployment extends Component {

  constructor(props) {
    super(props);
    this.getClasses = this.getClasses.bind(this);
  }

  getClasses(info) {
    var classes = ['deployment'];

    if (info.status) {
      classes.push(info.status);
    }

    return classes.join(' ');
  }

  render() {
    const info = this.props.info || {};

    return (
      <div className={this.getClasses(info)}>
      </div>
    );
  }
}

export default Deployment;