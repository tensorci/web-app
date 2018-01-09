import React, { Component } from 'react';

import Main from './Main';

class App extends Component {
  render() {
    return (
      <div id="appContainer" className={document.location.pathname.split('/')[1]}>
        <Main />
      </div>
    );
  }
}

export default App;