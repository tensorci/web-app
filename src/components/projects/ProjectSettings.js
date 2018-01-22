import React, { Component } from 'react';
import Link from '../../utils/Link';
import ProjectCreds from './ProjectCreds';
import ProjectEnvs from './ProjectEnvs';
import ProjectWebhooks from './ProjectWebhooks';

class ProjectSettings extends Component {

  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
    this.currentLink = this.currentLink.bind(this);
    this.getAsideLinks = this.getAsideLinks.bind(this);
  }

  getLinks(team, repo) {
    const baseLink = '/' + team + '/' + repo + '/settings';

    return [
      {
        href: baseLink,
        text: 'Credentials',
        comp: <ProjectCreds team={team} repo={repo}/>
      },
      {
        href: baseLink + '/envs',
        text: 'Environment Variables',
        comp: <ProjectEnvs team={team} repo={repo}/>
      },
      {
        href: baseLink + '/webhooks',
        text: 'Webhooks',
        comp: <ProjectWebhooks team={team} repo={repo}/>
      }
    ];
  }

  currentLink(team, repo) {
    const links = this.getLinks(team, repo);

    for (var i = 0; i < links.length; i++) {
      if (links[i].href === window.location.pathname) {
        return links[i];
      }
    }
  }

  getAsideLinks(team, repo) {
    var classes;
    const links = this.getLinks(team, repo);

    return links.map((link, i) => {
      classes = 'aside-item';

      if (link.href === window.location.pathname) {
        classes += ' active';
      }

      return <Link key={i} className={classes} href={link.href}>{link.text}</Link>;
    });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div id="projectSettings">
        <aside key={0} className="app-aside">
          <nav className="aside-left-menu">
            <div className="aside-project">
              <header>
                <h4>Project Settings</h4>
              </header>
              <div className="aside-project-options">{this.getAsideLinks(team, repo)}</div>
            </div>
          </nav>
        </aside>
        <div key={1} className="main-body">
          {(this.currentLink(team, repo) || {}).comp}
        </div>
      </div>
    );
  }
}

export default ProjectSettings;