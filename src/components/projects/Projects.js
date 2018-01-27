import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import NoProjectsForTeam from './NoProjectsForTeam';
import ProjectsList from './ProjectsList';

class Projects extends Component {

  constructor(props) {
    super(props);

    this.getProjectComp = this.getProjectComp.bind(this);

    this.state = {
      loading: true,
      projects: [],
      team: this.props.team
    };
  }

  componentDidMount() {
    Ajax.get('/api/repos', { team: this.state.team }, (data) => {
      this.setState({
        projects: data.repos || [],
        loading: false
      });
    });
  }

  getProjectComp() {
    // No projects have been created for this team yet
    if (!this.state.projects || this.state.projects.length === 0) {
      return <NoProjectsForTeam team={this.state.team}/>;
    }

    // Projects exist
    return <ProjectsList projects={this.state.projects} team={this.state.team}/>;
  }

  render() {
    if (this.state.loading) {
      return <div id="projects"><DashLoadingSpinner/></div>;
    }

    return (
      <div id="projects" className="main-body">
        <div className="main-content">
          <div className="main">{this.getProjectComp()}</div>
        </div>
      </div>
    );
  }
}

export default Projects;