import React, { Component } from 'react';
import Link from '../../utils/Link';

class RepoSearchResult extends Component {

  formatName(repo, team) {
    if (repo.exists) {
      return <Link href={'/projects/' + team + '/' + repo.slug}>{repo.name}</Link>;
    } else {
      return <span>{repo.name}</span>;
    }
  }

  getSetupCol(repo, team) {
    if (!repo.creatable) {
      return <div className="notice"><i className="material-icons">lock</i>Contact repo admin</div>;
    }

    var text, href;
    var classes = 'button primary';

    if (repo.exists) {
      text = 'View deploys';
      classes += ' exists';
      href = '/' + team + '/' + repo.slug;
    } else {
      text = 'Setup project';
      href = '/setup-project/' + team + '/' + repo.slug;
    }

    return (
      <div className="setup-column">
        <Link href={href} className={classes}>{text}</Link>
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