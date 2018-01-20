import React, { Component } from 'react';
import LogStage from './stages/LogStage';
import StatusStage from './stages/StatusStage';

class DeploymentStages extends Component {

  constructor(props) {
    super(props);

    this.formatStages = this.formatStages.bind(this);

    this.orderedStages = [
      'train_building',
      'training_scheduled',
      'training',
      'training_done',
      'api_building',
      'predicting_scheduled',
      'predicting'
    ];

    this.state = {
      stages: this.props.stages || {},
      currentStage: this.props.currentStage
    };
  }

  compForStage(stageSlug, stage, isCurrentStage, i) {
    switch (stageSlug) {
    case 'train_building':
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case 'training_scheduled':
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case 'training':
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case 'training_done':
      return <StatusStage data={stage} current={isCurrentStage} key={i}/>;
    case 'api_building':
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case 'predicting_scheduled':
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case 'predicting':
      return <StatusStage data={stage} current={isCurrentStage} key={i}/>;
    default:
      return null;
    }
  }

  formatStages() {
    var stage, comp;
    var stageComps = [];

    console.log('this.state.stages = ', this.state.stages);

    this.orderedStages.forEach((stageSlug, i) => {
      stage = this.state.stages[stageSlug];

      console.log(stageSlug, stage);

      if (stage && stage.show) {
        comp = this.compForStage(stageSlug, stage, stageSlug === this.state.currentStage, i);

        if (comp) {
          stageComps.push(comp);
        }
      }
    });

    return stageComps;
  }

  render() {
    return (
      <div className="deployment-stages">{this.formatStages()}</div>
    );
  }
}

export default DeploymentStages;