import React, { Component } from 'react';
import NoPredictionsForProject from './NoPredictionsForProject';
import timeago from 'timeago.js';

class PredictionInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const prediction = this.props.prediction;

    if (prediction === null) {
      return <NoPredictionsForProject team={team} repo={repo}/>;
    }

    return (
      <div className="prediction-info">
        <div className="insights-metadata-header">
          <div className="card insights-metadata">
            <div className="insight-name">Status</div>
            <div className="insight status">
              <i className="fa fa-check-circle"></i>
              <span>Running</span>
            </div>
          </div>
          <div className="card insights-metadata middle">
            <div className="insight-name">Last Updated</div>
            <div className="insight datetime">{timeago().format(prediction.last_updated * 1000)}</div>
          </div>
          <div className="card insights-metadata">
            <div className="insight-name">Prediction Count</div>
            <div className="insight pred-count">{prediction.pred_count}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="title">
              Sample Prediction
            </div>
          </div>
          <div className="card-body">
            <div className="prediction-info">
              Fetch a live API prediction from your trained model.
            </div>
            <div className="coming-soon">
              Coming soon.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PredictionInfo;