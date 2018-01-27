import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import RepoSearchResult from './RepoSearchResult';
import SearchInput, { createFilter } from 'react-search-input';

class TeamRepoSearch extends Component {

  constructor(props) {
    super(props);

    this.searchUpdated = this.searchUpdated.bind(this);
    this.formatResults = this.formatResults.bind(this);

    this.state = {
      search: '',
      projects: [],
      loading: true
    };
  }

  componentDidMount() {
    Ajax.get('/api/repos/available', { team: this.props.team }, (data) => {
      this.setState({
        projects: data.repos,
        loading: false
      });
    });
  }

  searchUpdated(term) {
    this.setState({ search: term });
  }

  formatResults(results) {
    return results.map((repo) => {
      return <RepoSearchResult key={repo.slug} repo={repo} team={this.props.team}/>;
    });
  }

  render() {
    const results = this.state.projects.filter(createFilter(this.state.search, ['slug']));

    return (
      <div className="project-search">
        <div className="filter-row">
          <SearchInput className="search-input" placeholder="Filter projects..." onChange={this.searchUpdated}/>
        </div>
        <div>
          {this.state.loading ?
            <div className="filter-project-loading"><DashLoadingSpinner/><p>Fetching repos from GitHub...</p></div> :
            <ul className="proj-list">{this.formatResults(results)}</ul>}
        </div>
      </div>
    );
  }
}

export default TeamRepoSearch;