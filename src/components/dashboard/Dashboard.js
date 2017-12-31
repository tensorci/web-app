import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import AvailableReposList from './AvailableReposList';


class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mainComp: null
    };
  }

  componentDidMount() {
    Ajax.get('/api/repos')
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.repos || data.repos.length === 0) {
          this.setState({ mainComp: <AvailableReposList/> });
        } else {
          console.log('Found ' + data.repos.length + ' TensorCI repos');
        }
      });
  }

  getMainComp() {
    return this.state.mainComp;
  }

  render() {
    return (
      <div id="home">
        <div>{this.getMainComp()}</div>
      </div>
    );
  }
}

export default Dashboard;