import React from 'react';
import Link from '../../../utils/Link';
import LogStage from './LogStage';

class TrainingStage extends LogStage {

  getActionBtns(data, isCurrentStage, team, repo, uid, intent) {
    return [
      <Link href={'/metrics/' + team + '/' + repo + '/' + uid} className="button secondary">View metrics</Link>
    ];
  }
}

export default TrainingStage;