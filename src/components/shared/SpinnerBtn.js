import React, { Component } from 'react';

class SpinnerBtn extends Component {

  constructor(props) {
    super(props);

    this.formatClasses = this.formatClasses.bind(this);
    this.formatContents = this.formatContents.bind(this);
    this.onClick = this.onClick.bind(this);

    this.defaultCompleteTime = 1000; // ms
    this.loadingLocked = false;
    this.completeScheduled = false;

    this.status = {
      STATIC: 0,
      LOADING: 1,
      COMPLETE: 2
    };

    this.state = {
      status: this.status.STATIC
    };
  }

  componentDidUpdate() {
    switch (this.state.status) {
    case this.status.LOADING:
      if (this.props.minLoadingDuration) {
        this.loadingLocked = true;

        setTimeout(() => {
          this.loadingLocked = false;

          if (this.completeScheduled) {
            this.completeScheduled = false;
            this.setState({ status: this.status.COMPLETE });
          }
        }, this.props.minLoadingDuration);
      }
      break;
    case this.status.COMPLETE:
      if (!this.props.infiniteComplete) {
        setTimeout(() => {
          this.setState({ status: this.status.STATIC });
        }, this.props.completeTime || this.defaultCompleteTime);
      }
      break;
    default:
      // nothing
    }
  }

  formatClasses() {
    var classes = this.props.className ? this.props.className.split(' ') : [];

    classes.push('spinner-btn');

    switch (this.state.status) {
    case this.status.LOADING:
      classes.push('loading');
      break;
    case this.status.COMPLETE:
      classes.push('complete');
      break;
    default:
      // pass
    }

    return classes.join(' ');
  }

  formatContents() {
    switch (this.state.status) {
    case this.status.LOADING:
      return [
        <div key={0} className="bounce1"></div>,
        <div key={1} className="bounce2"></div>,
        <div key={2} className="bounce3"></div>
      ];
    case this.status.COMPLETE:
      if (this.props.completeText) {
        return [
          <i key={0} className="octicon octicon-check check"></i>,
          <span key={1}>{this.props.completeText}</span>
        ];
      } else {
        return this.props.children;
      }
    default:
      return this.props.children;
    }
  }

  onClick() {
    if (this.state.status === this.status.STATIC) {
      this.setState({ status: this.status.LOADING });

      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }

  complete() {
    if (this.loadingLocked) {
      this.completeScheduled = true;
    } else {
      this.setState({ status: this.status.COMPLETE });
    }
  }

  render() {
    return (
      <button className={this.formatClasses()} onClick={this.onClick}>{this.formatContents()}</button>
    );
  }
}

export default SpinnerBtn;