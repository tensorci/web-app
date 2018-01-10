import React, { Component } from 'react';
import History from '../../utils/History';

class RepoSearchResult extends Component {

  constructor(props) {
    super(props);
    this.formatName = this.formatName.bind(this);
    this.getSetupCol = this.getSetupCol.bind(this);
  }

  formatName(repo, team) {
    if (repo.exists) {
      const link = '/projects/' + team + '/' + repo.slug;
      return <a href="javascript:void(0)" onClick={() => { History.push(link); }}>{repo.name}</a>;
    } else {
      return <span>{repo.name}</span>;
    }
  }

  getSetupCol(repo, team) {
    if (!repo.creatable) {
      return <div className="notice"><i className="material-icons">lock</i>Contact repo admin</div>;
    }

    var text, link;
    var classes = 'button primary';

    if (repo.exists) {
      text = 'View project';
      classes += ' exists';
      link = '/projects/' + team + '/' + repo.slug;
    } else {
      text = 'Setup project';
      link = '/setup-project/' + team + '/' + repo.slug;
    }

    return (
      <div className="setup-column">
        <a href="javascript:void(0)" className={classes} onClick={() => { History.push(link); }}>{text}</a>
      </div>
    );
  }

  render() {
    const repo = this.props.repo || {};
    const team = this.props.team;

    return (
      <li className="repo-search-result">
        <div className="repo-name">
          {this.formatName(repo, team)}
        </div>
        {this.getSetupCol(repo, team)}
      </li>
    );
  }
}

export default RepoSearchResult;