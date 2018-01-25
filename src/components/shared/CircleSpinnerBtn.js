import React, { Component } from 'react';

class CircleSpinnerBtn extends Component {

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

    classes.push('cbs');

    switch (this.state.status) {
    case this.status.LOADING:
      classes.push('circle-button-spinner');
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
      return;
    case this.status.COMPLETE:
      return <i key={0} className="octicon octicon-check check"></i>;
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
      <button className={this.formatClasses()} title={this.props.title} onClick={this.onClick}>{this.formatContents()}</button>
    );
  }
}

export default CircleSpinnerBtn;