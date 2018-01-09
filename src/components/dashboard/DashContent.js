import React, { Component } from 'react';
import BreadCrumbs from '../shared/BreadCrumbs';
import Deployments from '../deployments/Deployments';
import Projects from '../projects/Projects';
import Session from '../../utils/Session';

class DashContent extends Component {

  constructor(props) {
    super(props);

    this.contentOptions = {
      '#deployments': {
        name: 'Deployments',
        comp: <Deployments/>
      },
      '#projects': {
        name: 'Projects',
        comp: <Projects/>
      }
    };
  }

  getBreadCrumbPath(lead) {
    var comps = [lead];
    const currTeam = Session.currTeam();

    if (currTeam) {
      comps.push(currTeam.name);
    }

    return comps;
  }

  render() {
    const currHash = window.location.hash;
    var currContent;

    // Get current content from location hash
    if (currHash) {
      currContent = this.contentOptions[window.location.hash] || {};
    } else {
      currContent = this.contentOptions['#deployments'];
    }

    var breadCrumbPath = [];

    if (currContent.name) {
      breadCrumbPath = this.getBreadCrumbPath(currContent.name);
    }

    return (
      <div id="dashContent">
        <div className="sub-header">
          <BreadCrumbs path={breadCrumbPath}/>
        </div>
        <div className="app-dominant">{currContent.comp}</div>
      </div>
    );
  }
}

export default DashContent;