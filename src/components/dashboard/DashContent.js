import React, { Component } from 'react';
import Account from '../account/Account';
import AddProjects from '../projects/AddProjects';
import BreadCrumbs from '../shared/BreadCrumbs';
import Datasets from '../datasets/Datasets';
import Deployment from '../deployments/Deployment';
import Deployments from '../deployments/Deployments';
import Projects from '../projects/Projects';
import ProjectSettings from '../projects/ProjectSettings';
import Settings from '../settings/Settings';
import SetupProject from '../projects/SetupProject';

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
      account: {
        name: 'User',
        comp: this.getAccountComp
      }
    };
  }

  getDeploymentsComp(team, repo, uid, meta) {
    return uid ? <Deployment team={team} repo={repo} uid={uid}/> : <Deployments team={team} repo={repo}/>;
  }

  getProjectsComp(team, repo, uid, meta) {
    if (meta.addProjects) {
      return <AddProjects team={team}/>;
    } else if (meta.setupProject) {
      return <SetupProject team={team} repo={repo}/>;
    } else if (meta.projectSettings) {
      return <ProjectSettings team={team} repo={repo}/>;
    } else {
      return <Projects team={team} repo={repo}/>;
    }
  }

  getDatasetsComp(team, repo, uid, meta) {
    return <Datasets team={team} repo={repo}/>;
  }

  getSettingsComp(team, repo, uid, meta) {
    return <Settings team={team} repo={repo}/>;
  }

  getAccountComp(team, repo, uid, meta) {
    return <Account/>;
  }

  createBreadCrumbPath(appSection, appSectionName, team, repo, uid, meta) {
    var comps = [{
      title: appSectionName,
      link: appSection === 'deployments' ? ('/' + team) : ('/' + appSection + '/' + team)
    }];

    if (appSection === 'account') {
      return comps;
    }

    if (appSection === 'projects' && (meta.addProjects || meta.setupProject)) {
      comps.push({
        title: 'Add Projects',
        link: '/add-projects/' + team
      });

      if (meta.setupProject && repo) {
        comps.push({
          title: team + '/' + repo,
          link: null
        });
      }
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

      if (uid) {
        comps.push({
          title: uid,
          link: null
        });
      }
    }

    return comps;
  }

  getActionBtns(appSection, team, meta) {
    var btns = [];

    if (appSection === 'projects' && !meta.addProjects && !meta.setupProject && !meta.projectSettings) {
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
    const uid = this.props.uid;
    const meta = this.props.meta;
    const content = this.contentOptions[appSection];

    if (!content) {
      return <div></div>;
    }

    const breadCrumbPath = this.createBreadCrumbPath(appSection, content.name, team, repo, uid, meta);

    return (
      <div id="dashContent">
        <div className="sub-header">
          <BreadCrumbs path={breadCrumbPath} actionBtns={this.getActionBtns(appSection, team, meta)}/>
        </div>
        <div className="app-dominant">{content.comp(team, repo, uid, meta)}</div>
      </div>
    );
  }
}

export default DashContent;