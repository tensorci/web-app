import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';


class Home extends Component {

  componentDidMount() {
    Ajax.get('/repos/dashboard')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
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