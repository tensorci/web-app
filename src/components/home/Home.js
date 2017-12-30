import React, { Component } from 'react';
import Session from '../../utils/Session';

import Ajax from '../../utils/Ajax';


class Home extends Component {

  componentDidMount() {
    console.log(Session.authed());
    // Ajax.get('/repos/dashboard')
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }

  render() {
    return (
      <div id="home">
        <div>Web app</div>
      </div>
    );
  }
}

export default Home;