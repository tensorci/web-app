import React, { Component } from 'react';
import intents from '../../utils/Intents';
import LogStage from './stages/LogStage';
import stages from '../../utils/Stages';
import StatusStage from './stages/StatusStage';

class DeploymentStages extends Component {

  constructor(props) {
    super(props);

    this.formatStages = this.formatStages.bind(this);
    this.getBuildActionBtn = this.getBuildActionBtn.bind(this);

    this.orderedStages = [
      stages.BUILDING_FOR_TRAIN,
      stages.TRAINING_SCHEDULED,
      stages.TRAINING,
      stages.DONE_TRAINING,
      stages.BUILDING_FOR_API,
      stages.PREDICTING_SCHEDULED,
      stages.PREDICTING,
    ];
  }

  compForStage(stageSlug, stage, isCurrentStage, i) {
    switch (stageSlug) {
    case stages.BUILDING_FOR_TRAIN:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.TRAINING_SCHEDULED:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.TRAINING:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.DONE_TRAINING:
      return <StatusStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.BUILDING_FOR_API:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.PREDICTING_SCHEDULED:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.PREDICTING:
      return <StatusStage data={stage} current={isCurrentStage} key={i}/>;
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

  getBuildActionBtn(currentStage, intent) {
    // if done training and there was only the intent to train, show the serve button.
    if (currentStage === stages.DONE_TRAINING && intent === intents.TRAIN && this.props.serve) {
      return <button className="primary" onClick={this.props.serve}>Deploy to API</button>;
    }
  }

  render() {
    const stages = this.props.stages;
    const currentStage = this.props.currentStage;
    const intent = this.props.intent;

    return (
      <div className="card col-sm-12 deployment-stages">
        <div className="build-steps">{this.formatStages(stages, currentStage)}</div>
        <div className="build-actions">{this.getBuildActionBtn(currentStage, intent)}</div>
      </div>
    );
  }
}

export default DeploymentStages;