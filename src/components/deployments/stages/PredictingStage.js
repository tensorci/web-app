import React from 'react';
import StatusStage from './StatusStage';
import Link from '../../../utils/Link';

class PredictingStage extends StatusStage {

  getActionBtns(data, isCurrentStage, team, repo, intent) {
    return [
      <Link href={'/predictions/' + team + '/' + repo} className="button secondary small">View predictions</Link>
    ];
  }
}

export default PredictingStage;