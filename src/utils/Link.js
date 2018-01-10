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
  }

  render() {
    return (
      <a href={this.props.href} className={this.props.className} onClick={this.onClick}>{this.props.children}</a>
    );
  }
}

export default Link;