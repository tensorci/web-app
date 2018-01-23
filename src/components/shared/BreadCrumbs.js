import React, { Component } from 'react';
import Link from '../../utils/Link';

class BreadCrumbs extends Component {

  formatCrumbs(path) {
    return (path || []).map((comp, i) => {
      return (
        <li key={i} className="crumb-node">
          <Link href={comp.link} className="crumb-text">{comp.title}</Link>
        </li>
      );
    });
  }

  getActionBtns(btns) {
    return (btns || []).map((info, i) => {
      return <Link key={i} href={info.link} title={info.title} className={(info.classes || []).join(' ')}>{info.contents}</Link>;
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