import React, { Component } from 'react';
import BreadCrumbs from '../shared/BreadCrumbs';
import Deployments from '../deployments/Deployments';
import Projects from '../projects/Projects';
import Session from '../../utils/Session';

class DashContent extends Component {

  constructor(props) {
    super(props);

    this.contentOptions = {
      deployments: {
        name: 'Deployments',
        comp: this.getDeploymentsComp
      },
      projects: {
        name: 'Projects',
        comp: this.getProjectsComp
      }
    };
  }

  getDeploymentsComp(team, repo) {
    return <Deployments team={team} repo={repo}/>;
  }

  getProjectsComp(team, repo) {
    return <Projects team={team} repo={repo}/>;
  }

  createBreadCrumbPath(appSection, appSectionName, team, repo) {
    var comps = [{
      title: appSectionName,
      link: appSection === 'deployments' ? ('/' + team) : ('/' + appSection + '/' + team)
    }];

    comps.push({
      title: team,
      link: comps[0].link
    });

    if (repo) {
      comps.push({
        title: repo,
        link: comps[1].link + '/' + repo
      });
    }

    return comps;
  }

  render() {
    const appSection = this.props.appSection;
    const team = this.props.team;
    const repo = this.props.repo;
    const content = this.contentOptions[appSection];

    if (!content) {
      return <div></div>;
    }

    const breadCrumbPath = this.createBreadCrumbPath(appSection, content.name, team, repo);

    return (
      <div id="dashContent">
        <div className="sub-header">
          <BreadCrumbs path={breadCrumbPath}/>
        </div>
        <div className="app-dominant">{content.comp(team, repo)}</div>
      </div>
    );
  }
}

export default DashContent;