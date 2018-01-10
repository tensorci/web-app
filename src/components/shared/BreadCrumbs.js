import React, { Component } from 'react';
import History from '../../utils/History';

class BreadCrumbs extends Component {

  constructor(props) {
    super(props);
    this.formatCrumbs = this.formatCrumbs.bind(this);
  }

  formatCrumbs(path) {
    var onClick;

    return (path || []).map((comp, i) => {
      onClick = () => {
        History.push(comp.link);
      };

      return (
        <li key={i} className="crumb-node">
          <a href="javascript:void(0)" className="crumb-text" onClick={onClick}>{comp.title}</a>
        </li>
      );
    });
  }

  render() {
    const path = this.props.path;

    return (
      <div className="breadcrumb-container">
        <ol className="breadcrumbs">{this.formatCrumbs(path)}</ol>
      </div>
    );
  }
}

export default BreadCrumbs;