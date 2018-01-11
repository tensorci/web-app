import React, { Component } from 'react';
import AccountIntegrations from './AccountIntegrations';
import AuthSettings from './AuthSettings';
import Link from '../../utils/Link';

class Account extends Component {

  constructor(props) {
    super(props);

    this.currentLink = this.currentLink.bind(this);
    this.getAsideLinks = this.getAsideLinks.bind(this);

    this.links = [
      {
        href: '/account',
        text: 'Account Integrations',
        comp: <AccountIntegrations/>
      },
      {
        href: '/account/auth',
        text: 'Auth Settings',
        comp: <AuthSettings/>
      }
    ];
  }

  currentLink() {
    for (var i = 0; i < this.links.length; i++) {
      if (this.links[i].href === window.location.pathname) {
        return this.links[i];
      }
    }
  }

  getAsideLinks() {
    var classes;

    return this.links.map((link, i) => {
      classes = 'aside-item';

      if (link.href === window.location.pathname) {
        classes += ' active';
      }

      return <Link key={i} className={classes} href={link.href}>{link.text}</Link>;
    });
  }

  render() {
    return (
      <div id="account">
        <aside key={0} className="app-aside">
          <nav className="aside-left-menu">
            <div className="aside-user">
              <header>
                <h4>User Settings</h4>
              </header>
              <div className="aside-user-options">{this.getAsideLinks()}</div>
            </div>
          </nav>
        </aside>
        <div key={1} className="main-body">
          {(this.currentLink() || {}).comp}
        </div>
      </div>
    );
  }
}

export default Account;