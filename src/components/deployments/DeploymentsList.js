import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Deployment from './Deployment';
import NoDeploymentsForProject from './NoDeploymentsForProject';

class DeploymentsList extends Component {

  constructor(props) {
    super(props);

    this.fetchDeployments = this.fetchDeployments.bind(this);

    this.state = {
      deployments: [],
      loading: true,
      repo: this.props.repo
    };
  }

  componentDidMount() {
    if (this.props.repo) {
      this.fetchDeployments();
    }
  }

  componentDidUpdate() {
    if (this.state.loading && this.state.repo) {
      this.fetchDeployments();
    }
  }

  fetchDeployments() {
    Ajax.get('/api/deployments', { team: this.props.team, repo: this.state.repo })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          deployments: data.deployments,
          loading: false
        });
      });
  }

  formatDeployments(team, repo) {
    // No project to fetch deployments for, so don't render anything
    if (!repo) {
      return;
    }

    // Project exists, but no deployments for project
    if (this.state.deployments.length === 0) {
      return <NoDeploymentsForProject team={team} repo={repo}/>;
    }

    // render the deployments
    return this.state.deployments.map((d, i) => {
      return <Deployment key={i} info={d} team={team} repo={repo}/>;
    });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div className="main-body">
        <div className="deployment-list">
          <div className="container-fluid">
            {this.formatDeployments(team, repo)}
          </div>
        </div>
      </div>
    );
  }
}

export default DeploymentsList;