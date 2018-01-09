import React, { Component } from 'react';

class SideNav extends Component {

  constructor(props) {
    super(props);

    this.getLinks = this.getLinks.bind(this);

    this.links = [
      {
        name: 'Deployments',
        hash: '#deployments',
        icon: 'storage'
      },
      {
        name: 'Projects',
        hash: '#projects',
        icon: 'book'
      }
    ];
  }

  getLinks() {
    const currHash = window.location.hash;
    var classes;

    return this.links.map((l, i) => {
      classes = 'aside-item';

      if ((!currHash && i === 0) || l.hash === currHash) {
        classes += ' current';
      }

      return (
        <a key={i} href={l.hash} className={classes}>
          <i className="material-icons">{l.icon}</i>
          <div className="nav-label">{l.name}</div>
        </a>
      );
    });
  }

  render() {
    return (
      <nav className="aside-left-nav">{this.getLinks()}</nav>
    );
  }
}

export default SideNav;