import React, { Component } from 'react';
import Link from '../../utils/Link';

class ProjectsList extends Component {

  formatRows(projects, team) {
    var href;

    return (projects || []).map((p, i) => {
      href = '/' + team + '/' + p.slug;

      return (
        <tr key={i}>
          <td>
            <Link href={href} className="project-list-item-name">{p.name}</Link>
          </td>
          <td className="shrink right">Yes</td>
          <td className="shrink">
            <Link href={href + '/edit'}>
              <i className="material-icons">settings</i>
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    const team = this.props.team;
    const projects = this.props.projects;

    return (
      <div className="card projects-list">
        <div className="card-header">
          <div className="title">
            <i className="provider-icon fa fa-github"></i>
            {team}
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th className="shrink right">Cool</th>
                <th className="shrink">Settings</th>
              </tr>
            </thead>
            <tbody>
              {this.formatRows(projects, team)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProjectsList;