import React from 'react';
import Ajax from '../../../utils/Ajax';
import intents from '../../../utils/Intents';
import SpinnerBtn from '../../shared/SpinnerBtn';
import StatusStage from './StatusStage';

class PredictingStage extends StatusStage {

  deployToApi(team, repo) {
    Ajax.post('/api/deployment/api', {
      git_url: 'https://github.com/' + team + '/' + repo + '.git'
    });
  }

  getActionBtns(data, isCurrentStage, team, repo, intent) {
    // only show the "Deploy to API" button if deployment is currently static sitting in the Trained state.
    if (!isCurrentStage || intent !== intents.TRAIN) {
      return;
    }

    return [
      <SpinnerBtn className="secondary" onClick={() => { this.deployToApi(team, repo); }}>Deploy to API</SpinnerBtn>
    ];
  }
}

export default PredictingStage;