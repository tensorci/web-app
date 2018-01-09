// History Singleton
import createHistory from 'history/createBrowserHistory';

var History;

function getInstance() {
  if (!History) {
    History = createHistory();
  }

  return History;
}

export default getInstance();