import React, { Component } from 'react';
import DropdownItem from './DropdownItem';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getClasses = this.getClasses.bind(this);

    this.items = [];

    this.state = {
      open: false
    };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  getClasses() {
    var classes = ['dropdown'];

    if (this.state.open) {
      classes.push('open');
    }

    return classes.join(' ');
  }

  getItems() {
    return this.items.map((item, i) => {
      return <DropdownItem key={i} heading={item.heading} desc={item.desc} href={item.href} extLink={item.extLink} />;
    });
  }

  render() {
    return (
      <li className={this.getClasses()}>
        <button data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.open ? 'true' : 'false'}
          className="dropdown-toggle"
          onClick={this.toggle}>
          {this.props.title}
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
        <ul className="dropdown-menu pull-right animated slideInDown">{this.getItems()}</ul>
      </li>
    );
  }
}

export default Dropdown;