import React, { Component } from 'react';
import Deployments from '../deployments/Deployments';
import Projects from '../projects/Projects';

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

  render() {
    const currHash = window.location.hash;

    if (currHash) {
      var currContent = this.contentOptions[window.location.hash] || {};
    } else {
      var currContent = this.contentOptions['#deployments'];
    }

    var subHeaderText;

    if (currContent.name) {
      subHeaderText = currContent.name;
    }

    return (
      <div id="dashContent">
        <div className="sub-header">{subHeaderText}</div>
        <div className="app-dominant">{currContent.comp}</div>
      </div>
    );
  }
}

export default DashContent;