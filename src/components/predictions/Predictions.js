import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import PredictionInfo from './PredictionInfo';
import ProjectAside from '../shared/ProjectAside';

class Deployments extends Component {

  constructor(props) {
    super(props);

    this.fetchReposWithPredictions = this.fetchReposWithPredictions.bind(this);
    this.fetchPrediction = this.fetchPrediction.bind(this);

    this.state = {
      loading: true,
      projects: [],
      prediction: null,
      team: this.props.team,
      repo: this.props.repo
    };
  }

  componentDidMount() {
    this.fetchReposWithPredictions();
  }

  componentDidUpdate() {
    if (this.state.loading) {
      // data needs to be fetched
      this.fetchReposWithPredictions();
    } else if (this.props.team !== this.state.team) {
      // Team was changed, so put new team and repo into state and refetch by setting loading to true.
      this.setState({
        loading: true,
        team: this.props.team,
        repo: this.props.repo
      });
    } else if (this.props.repo && (this.props.repo !== this.state.repo)) {
      // Repo was changed, so just refetch deployments for that repo
      this.fetchPrediction(this.props.repo);
    }
  }

  fetchReposWithPredictions() {
    if (!this.state.team) {
      return;
    }

    const payload = {
      team: this.state.team,
      repo: this.state.repo
    };

    Ajax.get('/api/repos_with_prediction', payload, (data) => {
      data = data || {};
      const repo = data.repo || this.state.repo;

      this.setState({
        projects: data.repos || [],
        prediction: data.prediction,
        repo: repo,
        loading: false
      });
    });
  }

  fetchPrediction(repo) {
    const payload = {
      team: this.state.team,
      repo: repo
    };

    Ajax.get('/api/repo/prediction_info', payload, (data) => {
      this.setState({
        prediction: data.prediction,
        repo: repo
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div id="predictions"><DashLoadingSpinner/></div>;
    }

    return (
      <div id="predictions">
        <ProjectAside team={this.state.team} repo={this.state.repo} projects={this.state.projects} linkPrefix="/predictions"/>
        <div className="main-display">
          <div className="main-body">
            <PredictionInfo team={this.state.team} repo={this.state.repo} prediction={this.state.prediction}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Deployments;