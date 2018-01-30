import React from 'react';
import Ajax from '../../../utils/Ajax';
import banner from '../../../utils/Banner';
import intents from '../../../utils/Intents';
import SpinnerBtn from '../../shared/SpinnerBtn';
import StatusStage from './StatusStage';

class PredictingStage extends StatusStage {

  deployToApi(team, repo) {
    const payload = {
      git_url: 'https://github.com/' + team + '/' + repo + '.git',
      with_log_stream: false
    };

    Ajax.post('/api/deployment/api', payload, (data, failed) => {
      if (failed) {
        banner.error('Failed to deploy to API.');
        this.deployBtn.static();
      }
    });
  }

  getActionBtns(data, isCurrentStage, team, repo, intent) {
    // only show the "Deploy to API" button if deployment is currently static sitting in the Trained state.
    if (!isCurrentStage || intent !== intents.TRAIN) {
      return;
    }

    return [
      <SpinnerBtn
        className="secondary"
        onClick={() => { this.deployToApi(team, repo); }}
        ref={(r) => { this.deployBtn = r; }}>
        Deploy to API
      </SpinnerBtn>
    ];
  }
}

export default PredictingStage;