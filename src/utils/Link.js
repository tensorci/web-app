import React, { Component } from 'react';
import History from './History';

class Link extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    History.push(this.props.href);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <a href={this.props.href} className={this.props.className} title={this.props.title} onClick={this.onClick}>{this.props.children}</a>
    );
  }
}

export default Link;