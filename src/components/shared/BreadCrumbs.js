import React, { Component } from 'react';

class BreadCrumbs extends Component {

  constructor(props) {
    super(props);
    this.formatCrumbs = this.formatCrumbs.bind(this);
  }

  formatCrumbs() {
    return (this.props.path || []).map((comp, i) => {
      return <li key={i} className="crumb-node"><span className="crumb-text">{comp}</span></li>;
    });
  }

  render() {
    return (
      <div className="breadcrumb-container">
        <ol className="breadcrumbs">{this.formatCrumbs()}</ol>
      </div>
    );
  }
}

export default BreadCrumbs;