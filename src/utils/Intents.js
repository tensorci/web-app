var intents;

class I {
  constructor() {
    this.TRAIN = 'train';
    this.SERVE = 'serve';
  }
}

function getInstance() {
  if (!intents) {
    intents = new I();
  }

  return intents;
}

export default getInstance();