import React, { Component } from 'react';
import Link from '../../utils/Link';
import Session from '../../utils/Session';

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
        icon: 'fa-table'
      },
      {
        name: 'Settings',
        slug: 'settings',
        icon: 'settings'
      }
    ];
  }

  getLinks(appSection, team) {
    var classes, href, icon;

    return this.links.map((link, i) => {
      classes = 'aside-item';

      if (link.slug === appSection) {
        classes += ' current';
      }

      if (link.slug === 'deployments') {
        href = '/' + team;
      } else {
        href = '/' + link.slug + '/' + team;
      }

      if (link.icon.startsWith('fa-')) {
        icon = <i className={'fa ' + link.icon}></i>;
      } else {
        icon = <i className="material-icons">{link.icon}</i>;
      }

      return (
        <Link key={i} href={href} className={classes}>
          {icon}
          <div className="nav-label">{link.name}</div>
        </Link>
      );
    });
  }

  render() {
    const appSection = this.props.appSection;

    // default team is username
    const team = this.props.team || Session.username();

    return (
      <nav className="aside-left-nav">{this.getLinks(appSection, team)}</nav>
    );
  }
}

export default SideNav;