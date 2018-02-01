import React, { Component } from 'react';
import Link from '../../utils/Link';
import NestedProjectDeployment from '../deployments/NestedProjectDeployment';

class ProjectAside extends Component {

  constructor(props) {
    super(props);
    this.toggleDeploymentsVisibility = this.toggleDeploymentsVisibility.bind(this);
    this.slideDuration = 250;
  }

  toggleDeploymentsVisibility(e) {
    // const $li = $(e.target).parent().parent();
    //
    // if ($parent.hasClass('open')) {
    //   $parent.removeClass('open');
    //   $el.animate({ height: 0 }, this.slideDuration );
    // } else {
    //   $parent.addClass('open');
    //   $el.animate({ height: $el.get(0).scrollHeight }, this.slideDuration );
    // }
  }

  formatProjectList(projects, team, repo, deploymentUid, linkPrefix) {
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

      if (!deploymentUid && ((!repo && i === 0) || p.slug === repo)) {
        classes += ' selected';
      }

      teamRepoHref = '/' + team + '/' + p.slug;
      editProjHref = teamRepoHref + '/settings';
      projHref = linkPrefix + teamRepoHref;

      const deployments = p.deployments || [];
      // const icon = deployments.length === 0 ?
      //   <i className="right-arr fa fa-chevron-right"></i> :
      //   <i className="right-arr fa fa-chevron-right" onClick={this.toggleDeploymentsVisibility}></i>;

      const icon = <i className="right-arr fa fa-chevron-right"></i>;

      return (
        <li key={i} className={deployments.length === 0 ? null : 'open'}>
          <div className={classes}>
            {icon}
            <Link href={projHref} className="project-name">{p.name}</Link>
            <Link href={editProjHref} className="project-settings-icon">
              <i className="material-icons">settings</i>
            </Link>
          </div>
          {this.formatDeployments(deployments, projHref, team, repo, deploymentUid)}
        </li>
      );
    });
  }

  formatDeployments(deployments, projHref, team, repo, deploymentUid) {
    if (deployments.length === 0) {
      return;
    }

    var selected;
    const formattedDeployments = deployments.map((d, i) => {
      selected = d.uid === deploymentUid;
      
      return (
        <li key={i} className={'nested-project-deployment-item-container' + (selected ? ' selected' : '')}>
          <Link href={projHref + '/' + d.uid}>
            <NestedProjectDeployment team={team} repo={repo} {...d}/>
          </Link>
        </li>
      );
    });

    return <ul className="proj-aside-nested-list">{formattedDeployments}</ul>;
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const deploymentUid = this.props.deploymentUid;
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
            <ul className="projects">{this.formatProjectList(projects, team, repo, deploymentUid, linkPrefix)}</ul>
          </div>
        </nav>
      </aside>
    );
  }
}

export default ProjectAside;