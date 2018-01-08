import React, { Component } from 'react';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    return [];
  }

  render() {
    return (
      <li className="dropdown">
        <button data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.props.open ? 'true' : 'false'} className="dropdown-toggle">
          {this.props.title}
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
        <ul className="dropdown-menu pull-right animated slideInDown">{this.getItems()}</ul>
      </li>
    );
  }
}

export default Dropdown;