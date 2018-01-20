import React, { Component } from 'react';
import $ from 'jquery';

class LogStage extends Component {

  constructor(props) {
    super(props);

    this.getLogs = this.getLogs.bind(this);
    this.toggleHeight = this.toggleHeight.bind(this);
    this.getStatusClass = this.getStatusClass.bind(this);

    this.slideDuration = 250;

    this.state = this.props.data || {};
    this.state.current = this.props.current || false;
  }

  getLogs() {
    return this.state.logs.map((line, i) => {
      return <div key={i} className="log-msg white">{line}</div>;
    });
  }

  toggleHeight() {
    const $parent = $(this.actionHeaderRef);
    const $el = $(this.wrapperRef);

    if ($parent.hasClass('open')) {
      $parent.removeClass('open');
      $el.animate({ height: 0 }, this.slideDuration );
    } else {
      $parent.addClass('open');
      $el.animate({ height: $el.get(0).scrollHeight }, this.slideDuration );
    }
  }

  getStatusClass() {
    var statusClass = '';

    if (this.state.succeeded) {
      statusClass = ' success';
    } else if (this.state.failed) {
      statusClass = ' failed';
    } else if (this.state.current) {
      statusClass = ' running';
    }

    return statusClass;
  }

  render() {
    const detailWrapperStyle = {
      height: (this.state.current && !this.actionHeaderRef) || (this.actionHeaderRef && $(this.actionHeaderRef).hasClass('open')) ? 'auto' : 0
    };

    return (
      <div className="build-output">
        <div className={'action-header contents' + (this.state.current ? ' open' : '') + this.getStatusClass()} ref={(r) => { this.actionHeaderRef = r; }}>
          <div className="ah-wrapper">
            <div className="ah-wrapper-header contents" onClick={this.toggleHeight}>
              <div className="button contents">
                <i className="fa fa-chevron-right right-arrow"></i>
              </div>
              <div className="command contents">
                <span className="stage-name">{this.state.name}</span>
              </div>
            </div>
            <div className="detail-wrapper" style={detailWrapperStyle} ref={(r) => { this.wrapperRef = r; }}>
              <div className={'detail contents' + this.getStatusClass()}>
                <div className="action-log-messages">
                  <pre className="output">
                    <span className="pre">{this.getLogs()}</span>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogStage;