import React, { Component } from 'react';
import LogStage from './stages/LogStage';
import StatusStage from './stages/StatusStage';

class DeploymentStages extends Component {

  constructor(props) {
    super(props);

    this.formatStages = this.formatStages.bind(this);
    this.heardStageUpdate = this.heardStageUpdate.bind(this);

    this.orderedStages = [
      'train_building',
      'training_scheduled',
      'training',
      'training_done',
      'api_building',
      'predicting_scheduled',
      'predicting'
    ];
  }

  compForStage(stageSlug, stage, isCurrentStage, i) {
    switch (stageSlug) {
    case 'train_building':
      return <LogStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.train_building = r; }}/>;
    case 'training_scheduled':
      return <LogStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.training_scheduled = r; }}/>;
    case 'training':
      return <LogStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.training = r; }}/>;
    case 'training_done':
      return <StatusStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.training_done = r; }}/>;
    case 'api_building':
      return <LogStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.api_building = r; }}/>;
    case 'predicting_scheduled':
      return <LogStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.predicting_scheduled = r; }}/>;
    case 'predicting':
      return <StatusStage data={stage} current={isCurrentStage} key={i} ref={(r) => { this.predicting = r; }}/>;
    default:
      return null;
    }
  }

  formatStages(stages, currentStage) {
    var stage, comp;
    var stageComps = [];

    this.orderedStages.forEach((stageSlug, i) => {
      stage = stages[stageSlug];

      if (stage && stage.show) {
        comp = this.compForStage(stageSlug, stage, stageSlug === currentStage, i);

        if (comp) {
          stageComps.push(comp);
        }
      }
    });

    return stageComps;
  }

  heardStageUpdate(data) {
    // set new state on the stages that were updated
    for (var stage in data) {
      if (this[stage]) {
        this[stage].setState(data[stage]);
      }
    }
  }

  render() {
    const stages = this.props.stages;
    const currentStage = this.props.currentStage;

    return (
      <div className="card col-sm-12 deployment-stages">
        <div className="build-steps">{this.formatStages(stages, currentStage)}</div>
      </div>
    );
  }
}

export default DeploymentStages;