import React, { Component } from 'react';
import $ from 'jquery';

class DatasetPreview extends Component {

  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.slideDuration = 300;
  }

  toggleVisibility() {
    const $container = $(this.container);
    const $btnText = $(this.btnText);
    const $preview = $(this.preview);

    if ($container.hasClass('show')) {
      $btnText.html('Preview dataset');
      $container.removeClass('show');
      $preview.animate({ height: 0 }, this.slideDuration );
    } else {
      $btnText.html('Hide preview');
      $container.addClass('show');
      $preview.animate({ height: $preview.get(0).scrollHeight }, this.slideDuration );
    }
  }

  render() {
    const preview = JSON.stringify(this.props.preview || [], undefined, 2);

    return (
      <div className="dataset-preview-container" ref={(r) => { this.container = r; }}>
        <div className="toggle-preview-btn-container">
          <button className="toggle-dset-preview" onClick={this.toggleVisibility}>
            <i className="fa fa-angle-up up-arrow"></i>
            <span ref={(r) => { this.btnText = r; }}>Preview dataset</span>
            <i className="fa fa-angle-down down-arrow"></i>
          </button>
        </div>
        <div className="dataset-preview" ref={(r) => { this.preview = r; }}>
          <pre className="language-json">{preview}</pre>
        </div>
      </div>
    );
  }
}

export default DatasetPreview;