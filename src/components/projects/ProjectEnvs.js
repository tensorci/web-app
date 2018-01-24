import React, { Component } from 'react';
import $ from 'jquery';
import Ajax from '../../utils/Ajax';
import Envs from './Envs';

class ProjectEnvs extends Component {

  constructor(props) {
    super(props);

    this.saveTrainEnvs = this.saveTrainEnvs.bind(this);
    this.saveApiEnvs = this.saveApiEnvs.bind(this);
    this.toggleSpinner = this.toggleSpinner.bind(this);

    this.circleBtnSpinnerClass = 'circle-button-spinner';
  }

  componentDidMount() {
    const payload = {
      team: this.props.team,
      repo: this.props.repo
    };

    Ajax.get('/api/envs', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.trainEnvs.setState({ values: data.train_envs, loading: false });
        this.apiEnvs.setState({ values: data.api_envs, loading: false });
      });
  }

  saveTrainEnvs() {
    if (this.trainEnvs && this.trainEnvs.isStatic() && !this.trainEnvs.isEmpty() && this.trainEnvs.formValid()) {
      this.toggleSpinner(this.saveTrainEnvsBtn, true);
      this.trainEnvs.save();
    }
  }

  saveApiEnvs() {
    if (this.apiEnvs && this.apiEnvs.isStatic() && !this.apiEnvs.isEmpty() && this.apiEnvs.formValid()) {
      this.toggleSpinner(this.saveApiEnvsBtn, true);
      this.apiEnvs.save();
    }
  }

  toggleSpinner(btn, show) {
    const $el = $(btn);
    show ? $el.addClass(this.circleBtnSpinnerClass) : $el.removeClass(this.circleBtnSpinnerClass);
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
              <button className="save-envs" onClick={this.saveTrainEnvs} ref={(r) => { this.saveTrainEnvsBtn = r; }}>
                <i className="material-icons">save</i>
              </button>
            </div>
            <div className="card-body">
              <p>Configure environment variables for your project when running on the TensorCI training cluster.</p>
              <Envs
                team={team}
                repo={repo}
                forCluster="train"
                onSaved={() => { this.toggleSpinner(this.saveTrainEnvsBtn, false); }}
                ref={(r) => { this.trainEnvs = r; }}/>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="title">API Env</div>
              <button className="save-envs" onClick={this.saveApiEnvs} ref={(r) => { this.saveApiEnvsBtn = r; }}>
                <i className="material-icons">save</i>
              </button>
            </div>
            <div className="card-body">
              <p>Configure environment variables for your project when serving model predictions from your API cluster.</p>
              <Envs
                team={team}
                repo={repo}
                forCluster="api"
                onSaved={() => { this.toggleSpinner(this.saveApiEnvsBtn, false); }}
                ref={(r) => { this.apiEnvs = r; }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEnvs;