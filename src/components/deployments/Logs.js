import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import $ from 'jquery';

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

    // fetch('/api/logtest').then(response => {
    //   // response.body is a readable stream.
    //   // Calling getReader() gives us exclusive access to
    //   // the stream's content
    //   var reader = response.body.getReader();
    //   var bytesReceived = 0;
    //
    //   // read() returns a promise that resolves
    //   // when a value has been received
    //   return reader.read().then(function processResult(result) {
    //     // Result objects contain two properties:
    //     // done  - true if the stream has already given
    //     //         you all its data.
    //     // value - some data. Always undefined when
    //     //         done is true.
    //     if (result.done) {
    //       console.log("Fetch complete");
    //       return;
    //     }
    //
    //     // result.value for fetch streams is a Uint8Array
    //     bytesReceived += result.value.length;
    //     console.log('Received', bytesReceived, 'bytes of data so far');
    //
    //     // Read some more, and call this function again
    //     return reader.read().then(processResult);
    //   });
    // });

    // Ajax.get('/api/logtest', payload)
    // fetch('/api/logtest', { headers: { 'Content-Type': 'application/octet-stream' } })
    //   .then((resp) => {
    //     var pump = (reader) => {
    //       return reader.read().then((result) => {
    //         console.log(result);
    //
    //         if (result.done) {
    //           return;
    //         }
    //
    //         var chunk = result.value;
    //         var text = '';
    //
    //         for (var i = 0; i < chunk.byteLength; i++) {
    //           text += String.fromCharCode(chunk[i]);
    //         }
    //
    //         $('#fuck').html(text);
    //
    //         return pump(reader);
    //       });
    //     };
    //
    //     return pump(resp.body.getReader());
    //   });
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
          <pre className="output" id="fuck">{this.getLogs()}</pre>
        </div>
      </div>
    );
  }
}

export default Logs;