import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Link from '../../utils/Link';

class ProjectAside extends Component {

  constructor(props) {
    super(props);

    this.formatProjectList = this.formatProjectList.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);

    this.state = {
      projects: [],
      loading: true,
      team: this.props.team
    };
  }

  formatProjectList(team, repo, linkPrefix) {
    if (this.state.projects.length === 0 && !this.state.loading) {
      return (
        <div className="proj-list-empty">
          <div className="card">
            <div className="card-body">
              <div>
                <p>No projects listed?</p>
                <Link href={'/add-projects/' + team} className="button secondary">
                  <span><i className="material-icons">library_add</i><span className="btn-text">Add projects</span></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    var classes, teamRepoHref, projHref, editProjHref;

    return this.state.projects.map((p, i) => {
      classes = 'project-heading';

      if ((!repo && i === 0) || p.slug === repo) {
        classes += ' selected';
      }

      teamRepoHref = '/' + team + '/' + p.slug;
      editProjHref = teamRepoHref + '/settings';
      projHref = linkPrefix + teamRepoHref;

      return (
        <li key={i}>
          <div className={classes}>
            <i className="right-arr fa fa-chevron-right"></i>
            <Link href={projHref} className="project-name">{p.name}</Link>
            <Link href={editProjHref} className="project-settings-icon">
              <i className="material-icons">settings</i>
            </Link>
          </div>
        </li>
      );
    });
  }

  componentDidMount() {
    this.fetchProjects();
  }

  componentDidUpdate() {
    if (this.props.team !== this.state.team) {
      this.setState({ team: this.props.team, loading: true });
    } else if (this.state.loading) {
      this.fetchProjects();
    }
  }

  fetchProjects() {
    Ajax.get('/api/repos', { team: this.state.team })
      .then((resp) => resp.json())
      .then((data) => {
        const repos = data.repos || [];

        if (!this.props.repo && this.props.onAutoSelect && repos.length > 0) {
          this.props.onAutoSelect(repos[0].slug);
        }

        this.setState({
          projects: repos,
          loading: false
        });
      });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const linkPrefix = this.props.linkPrefix || '';

    return (
      <aside className="app-aside">
        <nav className="aside-left-menu">
          <div className="aside-activity">
            <header>
              <select name="toggle-sorting" className="toggle-sorting">
                <option value="true">By project</option>
                <option value="">Recent</option>
              </select>
            </header>
            <ul className="projects">{this.formatProjectList(team, repo, linkPrefix)}</ul>
          </div>
        </nav>
      </aside>
    );
  }
}

export default ProjectAside;