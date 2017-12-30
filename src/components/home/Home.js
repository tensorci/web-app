import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';


class Home extends Component {

  constructor(props) {
    super(props);
    this.fetchAvailableRepos = this.fetchAvailableRepos.bind(this);
  }

  componentDidMount() {
    Ajax.get('/api/repos')
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.repos || data.repos.length === 0) {
          this.fetchAvailableRepos();
        } else {
          console.log('FOUND TENSORCI REPOS', data.repos);
        }
      });
  }

  fetchAvailableRepos() {
    Ajax.get('/api/repos/available')
      .then((resp) => resp.json())
      .then((data) => {
        console.log('FOUND AVAILABLE REPOS', data.repos);
      });
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