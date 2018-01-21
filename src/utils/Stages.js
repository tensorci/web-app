var stages;

class S {
  constructor() {
    this.BUILDING_FOR_TRAIN = 'train_building';
    this.TRAINING_SCHEDULED = 'training_scheduled';
    this.TRAINING = 'training';
    this.DONE_TRAINING = 'training_done';
    this.BUILDING_FOR_API = 'api_building';
    this.PREDICTING_SCHEDULED = 'predicting_scheduled';
    this.PREDICTING = 'predicting';
  }
}

function getInstance() {
  if (!stages) {
    stages = new S();
  }

  return stages;
}

export default getInstance();