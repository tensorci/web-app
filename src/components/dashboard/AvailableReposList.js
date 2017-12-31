import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import AvailableRepo from './AvailableRepo';


class AvailableReposList extends Component {

  constructor(props) {
    super(props);

    this.formatRepos = this.formatRepos.bind(this);
    this.registerRepos = this.registerRepos.bind(this);

    this.state = {
      repos: this.props.repos || []
    };
  }

  componentDidMount() {
    Ajax.get('/api/repos/available')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ repos: data.repos });
      });
  }

  formatRepos() {
    return (this.state.repos || []).map((data, i) => {
      return <AvailableRepo key={i} repo={data} />;
    });
  }

  registerRepos() {
    if (!this.state.repos) {
      return;
    }

    const repo = this.state.repos[0];

    Ajax.post('/api/repos', { repos: [repo] })
      .then((resp) => {
        console.log(resp.status);
      });
  }

  render() {
    return (
      <div className="available-repos-list-container">
        <ul className="available-repos-list">{this.formatRepos()}</ul>
        <button onClick={this.registerRepos}>Choose repos</button>
      </div>
    );
  }
}

export default AvailableReposList;
