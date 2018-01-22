import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Envs from './Envs';

class ProjectEnvs extends Component {

  constructor(props) {
    super(props);
    this.saveTrainEnvs = this.saveTrainEnvs.bind(this);
    this.saveApiEnvs = this.saveApiEnvs.bind(this);
  }

  componentDidMount() {
    const payload = {
      team: this.props.team,
      repo: this.props.repo
    };

    Ajax.get('/api/envs', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.trainEnvs.setState({ values: data.train_envs });
        this.apiEnvs.setState({ values: data.api_envs });
      });
  }

  saveTrainEnvs() {
    if (this.trainEnvs) {
      this.trainEnvs.save();
    }
  }

  saveApiEnvs() {
    if (this.apiEnvs) {
      this.apiEnvs.save();
    }
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div className="main-content">
        <div className="project-settings-inner edit-envs">
          <legend>Environment Variables</legend>
          <div className="card">
            <div className="card-header">
              <div className="title">Training Env</div>
              <button className="save-envs" onClick={this.saveTrainEnvs}>
                <i className="material-icons">save</i>
              </button>
            </div>
            <div className="card-body">
              <p>Configure environment variables for your project when running on the TensorCI training cluster.</p>
              <Envs team={team} repo={repo} forCluster="train" ref={(r) => { this.trainEnvs = r; }}/>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="title">API Env</div>
              <button className="save-envs" onClick={this.saveApiEnvs}>
                <i className="material-icons">save</i>
              </button>
            </div>
            <div className="card-body">
              <p>Configure environment variables for your project when serving model predictions from your API cluster.</p>
              <Envs team={team} repo={repo} forCluster="api" ref={(r) => { this.apiEnvs = r; }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEnvs;