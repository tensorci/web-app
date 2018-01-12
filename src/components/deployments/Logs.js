import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';

class Logs extends Component {

  constructor(props) {
    super(props);

    this.getLogs = this.getLogs.bind(this);

    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    const payload = {
      git_url: 'https://github.com/' + this.props.team + '/' + this.props.repo + '.git',
      uid: this.props.uid,
      follow: true
    };

    Ajax.get('/api/deployment/logs', payload)
      .then((resp) => {
        return resp.body.getReader().read();
      }).then((result, done) => {
        if (done) {
          // ???
        } else {
          // do something with each chunk
          console.log(result);
          this.setState({ logs: result });
        }
      });
  }

  getLogs() {
    return this.state.logs.map((line, i) => {
      return <span key={i} className="pre">{line}</span>;
    });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const uid = this.props.uid;

    return (
      <div className="log-container card">
        <div className="action-log-messages">
          <pre className="output">{this.getLogs()}</pre>
        </div>
      </div>
    );
  }
}

export default Logs;