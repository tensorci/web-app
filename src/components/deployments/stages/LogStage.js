import React, { Component } from 'react';
import $ from 'jquery';

class LogStage extends Component {

  constructor(props) {
    super(props);

    this.getLogs = this.getLogs.bind(this);
    this.toggleHeight = this.toggleHeight.bind(this);
    this.getStatusClass = this.getStatusClass.bind(this);

    this.slideDuration = 250;
  }

  getLogs(data) {
    return (data.logs || []).map((line, i) => {
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

  getStatusClass(data, current) {
    var statusClass = '';

    if (data.succeeded) {
      statusClass = ' success';
    } else if (data.failed) {
      statusClass = ' failed';
    } else if (current) {
      statusClass = ' running';
    }

    return statusClass;
  }

  render() {
    const data = this.props.data || {};
    const current = this.props.current || false;

    const detailWrapperStyle = {
      height: (current && !this.actionHeaderRef) || (this.actionHeaderRef && $(this.actionHeaderRef).hasClass('open')) ? 'auto' : 0
    };

    return (
      <div className="build-output">
        <div className={'action-header contents open' + this.getStatusClass(data, current)} ref={(r) => { this.actionHeaderRef = r; }}>
          <div className="ah-wrapper">
            <div className="ah-wrapper-header contents" onClick={this.toggleHeight}>
              <div className="button contents">
                <i className="fa fa-chevron-right right-arrow"></i>
              </div>
              <div className="command contents">
                <span className="stage-name">{data.name}</span>
              </div>
            </div>
            <div className="detail-wrapper" style={detailWrapperStyle} ref={(r) => { this.wrapperRef = r; }}>
              <div className={'detail contents' + this.getStatusClass(data, current)}>
                <div className="action-log-messages">
                  <pre className="output">
                    <span className="pre">{this.getLogs(data)}</span>
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