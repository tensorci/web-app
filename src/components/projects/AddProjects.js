import React, { Component } from 'react';
import TeamRepoSearch from './TeamRepoSearch';

class AddProjects extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const team = this.props.team;

    return (
      <div id="projects" className="main-body">
        <div id="addProjects">
          <div className="text-card">
            <div className="card">
              <div className="card-header">
                <div className="title">TensorCI helps you manage machine learning apps. Let's add some projects on TensorCI.</div>
              </div>
              <div className="card-body">
                <div>
                  <p>To kick things off, you'll need to choose a project to build.</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="team-repo-container">
            <div className="project-listing">
              <div className="proj-wrapper">
                <TeamRepoSearch team={team}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProjects;