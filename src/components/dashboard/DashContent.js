import React, { Component } from 'react';
import AddProjects from '../projects/AddProjects';
import BreadCrumbs from '../shared/BreadCrumbs';
import Datasets from '../datasets/Datasets';
import Deployments from '../deployments/Deployments';
import Projects from '../projects/Projects';
import Settings from '../settings/Settings';

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
      },
      datasets: {
        name: 'Datasets',
        comp: this.getDatasetsComp
      },
      settings: {
        name: 'Settings',
        comp: this.getSettingsComp
      },
    };
  }

  getDeploymentsComp(team, repo, meta) {
    return <Deployments team={team} repo={repo}/>;
  }

  getProjectsComp(team, repo, meta) {
    return meta.addProjects ? <AddProjects team={team}/> : <Projects team={team} repo={repo}/>;
  }

  getDatasetsComp(team, repo, meta) {
    return <Datasets team={team} repo={repo}/>;
  }

  getSettingsComp(team, repo, meta) {
    return <Settings team={team} repo={repo}/>;
  }

  createBreadCrumbPath(appSection, appSectionName, team, repo, meta) {
    var comps = [{
      title: appSectionName,
      link: appSection === 'deployments' ? ('/' + team) : ('/' + appSection + '/' + team)
    }];

    if (appSection === 'projects' && meta.addProjects) {
      comps.push({
        title: 'Add Projects',
        link: null
      });
    } else {
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
    }

    return comps;
  }

  getActionBtns(appSection, team, meta) {
    var btns = [];

    if (appSection === 'projects' && !meta.addProjects) {
      btns.push({
        link: '/add-projects/' + team,
        text: 'Add Project'
      });
    }

    return btns;
  }

  render() {
    const appSection = this.props.appSection;
    const team = this.props.team;
    const repo = this.props.repo;
    const meta = this.props.meta;
    const content = this.contentOptions[appSection];

    if (!content) {
      return <div></div>;
    }

    const breadCrumbPath = this.createBreadCrumbPath(appSection, content.name, team, repo, meta);

    return (
      <div id="dashContent">
        <div className="sub-header">
          <BreadCrumbs path={breadCrumbPath} actionBtns={this.getActionBtns(appSection, team, meta)}/>
        </div>
        <div className="app-dominant">{content.comp(team, repo, meta)}</div>
      </div>
    );
  }
}

export default DashContent;