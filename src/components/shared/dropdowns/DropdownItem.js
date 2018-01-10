import React, { Component } from 'react';
import History from '../../../utils/History';
import Link from '../../../utils/Link';

class DropdownItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.formatLink = this.formatLink.bind(this);
  }

  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  formatLink(heading, desc, href, internal) {
    const description = desc ? <div className="desc">{desc}</div> : null;

    if (internal) {
      var onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        History.push(this.props.href);
        this.handleClick(e);
      };

      return (
        <Link href={href} className="nav-item" onClick={onClick}>
          <div className="heading">{heading}</div>
          {description}
        </Link>
      );
    } else {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="nav-item" onClick={this.handleClick}>
          <div className="heading">{heading}</div>
          {description}
        </a>
      );
    }
  }

  render() {
    const heading = this.props.heading;
    const desc = this.props.desc;
    const href = this.props.href;
    const internal = this.props.internal;

    return (
      <li>{this.formatLink(heading, desc, href, internal)}</li>
    );
  }
}

export default DropdownItem;