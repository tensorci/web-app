// PubSub Singleton
import PubNub from 'pubnub';

var pubnub;

function getInstance() {
  if (!pubnub) {
    pubnub = new PubNub({
      publishKey : process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
      subscribeKey : process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
      ssl: true
    });
  }

  return pubnub;
}

export default getInstance();