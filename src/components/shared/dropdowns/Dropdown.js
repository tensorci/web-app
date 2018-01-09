import React, { Component } from 'react';
import DropdownItem from './DropdownItem';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.handleDocClick = this.handleDocClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.getDropdownMenuClasses = this.getDropdownMenuClasses.bind(this);
    this.getButtonContents = this.getButtonContents.bind(this);
    this.getItems = this.getItems.bind(this);

    this.items = [];
    this.state = { open: false };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleDocClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocClick, false);
  }

  handleDocClick(e) {
    if (this.container.contains(e.target)) {
      return;
    }

    this.setState({ open: false });
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  getClasses() {
    var classes = (this.props.classes || []).map((c) => { return c; });
    classes.unshift('dropdown');

    if (this.state.open) {
      classes.push('open');
    }

    return classes.join(' ');
  }

  getDropdownMenuClasses() {
    var classes = 'dropdown-menu pull-right animated slideInDown';

    if (this.props.dropdownMenuClasses) {
      classes += (' ' + this.props.dropdownMenuClasses.join(' '));
    }

    return classes;
  }

  getButtonContents() {
    return [this.props.title, <i key={1} className="material-icons">keyboard_arrow_down</i>];
  }

  getItems() {
    return this.items.map((item, i) => {
      return <DropdownItem key={i} heading={item.heading} desc={item.desc} href={item.href} extLink={item.extLink} onClick={item.onClick} />;
    });
  }

  render() {
    return (
      <li className={this.getClasses()} ref={this.setContainerRef}>
        <button data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.open ? 'true' : 'false'}
          className="dropdown-toggle"
          onClick={this.toggle}>
          {this.getButtonContents()}
        </button>
        <ul className={this.getDropdownMenuClasses()}>{this.getItems()}</ul>
      </li>
    );
  }
}

export default Dropdown;