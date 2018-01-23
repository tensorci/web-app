import React, { Component } from 'react';
import Link from '../../utils/Link';

class ProjectAside extends Component {

  formatProjectList(projects, team, repo, linkPrefix) {
    if (!projects || projects.length === 0) {
      return (
        <div className="proj-list-empty">
          <div className="card">
            <div className="card-body">
              <div>
                <p>No projects listed?</p>
                <Link href={'/add-projects/' + team} className="button">
                  <span>
                    <i className="material-icons">library_add</i>
                    <span className="btn-text">Add projects</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    var classes, teamRepoHref, projHref, editProjHref;

    return projects.map((p, i) => {
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

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const linkPrefix = this.props.linkPrefix || '';
    const projects = this.props.projects || [];

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
            <ul className="projects">{this.formatProjectList(projects, team, repo, linkPrefix)}</ul>
          </div>
        </nav>
      </aside>
    );
  }
}

export default ProjectAside;