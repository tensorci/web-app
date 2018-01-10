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

  getActionBtns(btns) {
    return (btns || []).map((info, i) => {
      return <a key={i} href="javascript:void(0)" className="button primary small" onClick={() => { History.push(info.link); }}>{info.text}</a>;
    });
  }

  render() {
    const path = this.props.path;
    const actions = this.props.actionBtns;

    return (
      <div className="breadcrumb-container">
        <ol className="breadcrumbs">{this.formatCrumbs(path)}</ol>
        <div className="actions">{this.getActionBtns(actions)}</div>
      </div>
    );
  }
}

export default BreadCrumbs;