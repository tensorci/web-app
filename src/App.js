import React, { Component } from 'react';

import Header from './components/shared/Header';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div id="appContainer" className={document.location.pathname.split('/')[1]}>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;