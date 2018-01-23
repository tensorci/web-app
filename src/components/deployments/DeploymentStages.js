import React, { Component } from 'react';
import LogStage from './stages/LogStage';
import stages from '../../utils/Stages';
import TrainedStage from './stages/TrainedStage';
import PredictingStage from './stages/PredictingStage';

class DeploymentStages extends Component {

  constructor(props) {
    super(props);

    this.formatStages = this.formatStages.bind(this);

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

  compForStage(stageSlug, stage, isCurrentStage, team, repo, intent, i) {
    switch (stageSlug) {
    case stages.BUILDING_FOR_TRAIN:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.TRAINING_SCHEDULED:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.TRAINING:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.DONE_TRAINING:
      return <TrainedStage data={stage} current={isCurrentStage} team={team} repo={repo} intent={intent} key={i}/>;
    case stages.BUILDING_FOR_API:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.PREDICTING_SCHEDULED:
      return <LogStage data={stage} current={isCurrentStage} key={i}/>;
    case stages.PREDICTING:
      return <PredictingStage data={stage} current={isCurrentStage} team={team} repo={repo} key={i}/>;
    default:
      return null;
    }
  }

  formatStages(stages, currentStage, team, repo, intent) {
    var stage, comp;
    var stageComps = [];

    this.orderedStages.forEach((stageSlug, i) => {
      stage = stages[stageSlug];

      if (stage && stage.show) {
        comp = this.compForStage(stageSlug, stage, stageSlug === currentStage, team, repo, intent, i);

        if (comp) {
          stageComps.push(comp);
        }
      }
    });

    return stageComps;
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const stages = this.props.stages;
    const currentStage = this.props.currentStage;
    const intent = this.props.intent;

    return (
      <div className="card col-sm-12 deployment-stages">
        <div className="build-steps">{this.formatStages(stages, currentStage, team, repo, intent)}</div>
      </div>
    );
  }
}

export default DeploymentStages;