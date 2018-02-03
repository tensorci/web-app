import React from 'react';
import StatusStage from './StatusStage';
import Link from '../../../utils/Link';

class PredictingStage extends StatusStage {

  getActionBtns(data, current, team, repo, uid, intent) {
    return [
      <Link href={'/predictions/' + team + '/' + repo} className="button secondary">View predictions</Link>
    ];
  }
}

export default PredictingStage;