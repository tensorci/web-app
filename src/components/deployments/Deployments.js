import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Link from '../../utils/Link';

class Deployments extends Component {

  constructor(props) {
    super(props);

    this.formatProjectList = this.formatProjectList.bind(this);

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

  formatProjectList(team, repo) {
    var classes, projHref;

    return this.state.projects.map((p, i) => {
      classes = 'project-heading';

      if (p.slug === repo) {
        classes += ' selected';
      }

      projHref = '/' + team + '/' + p.slug;

      return (
        <li key={i}>
          <div className={classes}>
            <i className="right-arr fa fa-chevron-right"></i>
            <Link href={projHref} className="project-name">{p.name}</Link>
            <Link href={projHref + '/edit'} className="project-settings-icon">
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

    return (
      <div id="deployments">
        <aside className="app-aside">
          <nav className="aside-left-menu">
            <div className="aside-activity">
              <header>
                <select name="toggle-sorting" className="toggle-sorting">
                  <option value="true">By project</option>
                  <option value="">Recent</option>
                </select>
              </header>
              <ul className="projects">{this.formatProjectList(team, repo)}</ul>
            </div>
          </nav>
        </aside>
        <div className="main-display"></div>
      </div>
    );
  }
}

export default Deployments;