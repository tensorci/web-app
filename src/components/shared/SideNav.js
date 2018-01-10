import React, { Component } from 'react';
import History from '../../utils/History';

class SideNav extends Component {

  constructor(props) {
    super(props);

    this.getLinks = this.getLinks.bind(this);

    this.links = [
      {
        name: 'Deployments',
        slug: 'deployments',
        icon: 'storage'
      },
      {
        name: 'Projects',
        slug: 'projects',
        icon: 'book'
      },
      {
        name: 'Datasets',
        slug: 'datasets',
        icon: 'book'
      },
      {
        name: 'Settings',
        slug: 'settings',
        icon: 'settings'
      }
    ];
  }

  getLinks(appSection, team) {
    var classes, newLink;

    return this.links.map((link, i) => {
      classes = 'aside-item';

      if (link.slug === appSection) {
        classes += ' current';
      }

      var onClick = () => {
        newLink = link.slug === 'deployments' ? ('/' + team) : ('/' + link.slug + '/' + team);
        History.push(newLink);
      };

      return (
        <a key={i} href="javascript:void(0)" className={classes} onClick={onClick}>
          <i className="material-icons">{link.icon}</i>
          <div className="nav-label">{link.name}</div>
        </a>
      );
    });
  }

  render() {
    const appSection = this.props.appSection;
    const team = this.props.team;

    return (
      <nav className="aside-left-nav">{this.getLinks(appSection, team)}</nav>
    );
  }
}

export default SideNav;