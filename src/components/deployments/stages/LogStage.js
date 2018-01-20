import React, { Component } from 'react';
import $ from 'jquery';

class LogStage extends Component {

  constructor(props) {
    super(props);

    this.getLogs = this.getLogs.bind(this);
    this.toggleHeight = this.toggleHeight.bind(this);

    this.state = this.props.data || {};
    this.state.current = this.props.current || false;
    this.state.success = true;
  }

  getLogs() {
    return this.state.logs.map((line, i) => {
      return <div key={i} className="log-msg white">{line}</div>;
    });
  }

  toggleHeight() {
    const $parent = $(this.parent);
    const $el = $(this.wrapperRef);

    if ($parent.hasClass('open')) {
      $parent.removeClass('open');
      $el.animate({ height: 0 }, 600 );
    } else {
      $parent.addClass('open');
      $el.animate({ height: $el.get(0).scrollHeight }, 600 );
    }
  }

  render() {
    const detailWrapperStyle = {
      height: (this.state.current && !this.parent) || (this.parent && $(this.parent).hasClass('open')) ? 'auto' : 0
    };

    return (
      <div className="build-output">
        <div className={'action-header contents' + (this.state.current ? ' open' : '') + (this.state.success ? ' success' : '')} ref={(r) => { this.parent = r; }}>
          <div className="ah-wrapper">
            <div className="header contents">
              <div className="button contents">
                <i className="fa fa-chevron-right right-arrow" onClick={this.toggleHeight}></i>
              </div>
              <div className="command contents">
                <span className="stage-name">{this.state.name}</span>
              </div>
            </div>
            <div className="detail-wrapper" style={detailWrapperStyle} ref={(r) => { this.wrapperRef = r; }}>
              <div className={'detail contents' + (this.state.success ? ' success' : '')}>
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