import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';

class DatasetPreview extends Component {

  constructor(props) {
    super(props);

    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = {
      uid: this.props.uid,
      shown: false,
      content: null
    };
  }

  toggleVisibility() {
    if (this.state.shown) {
      // Preview is being shown. Hide it.
      this.setState({ shown: false });
    } else if (this.state.content) {
      // Preview is hidden, but content has already been fetched
      this.setState({ shown: true });
    } else {
      // Fetch content and then show
      Ajax.get('/api/dataset/preview', { uid: this.state.uid })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            shown: true,
            content: JSON.stringify(data.preview, undefined, 2)
          });
        });
    }
  }

  render() {
    return (
      <div className={'dataset-preview-container' + (this.state.shown ? ' show' : '')}>
        <div className="toggle-preview-btn-container">
          <button className="toggle-dset-preview" onClick={this.toggleVisibility}>
            {this.state.shown ? <i className="fa fa-angle-up"></i> : null}
            <span>{this.state.shown ? 'Hide preview' : 'Preview dataset'}</span>
            {this.state.shown ? null : <i className="fa fa-angle-down"></i>}
          </button>
        </div>
        <div className="dataset-preview">
          <pre className="language-json">{this.state.content}</pre>
        </div>
      </div>
    );
  }
}

export default DatasetPreview;