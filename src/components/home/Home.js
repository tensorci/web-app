import React, { Component } from 'react';
import Session from '../../utils/Session';

class Home extends Component {

  componentWillMount() {
    console.log('AUTHED: ', Session.authed())
  }

  render() {
    return (
      <div id="home">
        <div>Main Content</div>
      </div>
    );
  }
}

export default Home;