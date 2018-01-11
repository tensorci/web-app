import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import ProjectsList from './ProjectsList';
import NoProjectsForTeam from './NoProjectsForTeam';

class Projects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      loading: true
    };
  }

  componentDidMount() {
    Ajax.get('/api/repos', { team: this.props.team })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          projects: data.repos || [],
          loading: false
        });
      });
  }

  getMainComp(team, repo) {
    // The existing projects are being fetched
    if (this.state.loading) {
      return <div className="dash-loading-spinner"></div>;
    }

    // No projects have been created for this team yet
    if (this.state.projects.length === 0) {
      return <NoProjectsForTeam team={team}/>;
    }

    // Projects exist
    return <ProjectsList projects={this.state.projects} team={team}/>;
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div id="projects" className="main-body">
        <div className="main-content">
          <div className="main">{this.getMainComp(team, repo)}</div>
        </div>
      </div>
    );
  }
}

export default Projects;