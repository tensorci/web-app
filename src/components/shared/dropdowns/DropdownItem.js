import React, { Component } from 'react';

class DropdownItem extends Component {

  render() {
    const heading = this.props.heading;
    const desc = this.props.desc;
    const href = this.props.href;
    const extLink = this.props.extLink;
    const target = extLink ? '_blank' : '_self';
    const rel = extLink ? 'noopener noreferrer' : '';

    return (
      <li>
        <a href={href} target={target} rel={rel} className="nav-item">
          <div className="heading">{heading}</div>
          {desc ? <div className="desc">{desc}</div> : null}
        </a>
      </li>
    );
  }
}

export default DropdownItem;