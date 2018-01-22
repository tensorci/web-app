import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';

class ToggleBtn extends Component {

  constructor(props) {
    super(props);

    this.activeColor = '#89d79e';
    this.inactiveColor = '#e6e6e9';
    this.thumbnailSize = 30;
    this.thumbnailBoxShadow = 'rgba(0, 0, 0, 0.12) 0px 0px 2px, rgba(0, 0, 0, 0.24) 0px 2px 4px';
    this.thumnailAnimateRange = [-10, 36];

    this.colors = { active: { base: this.activeColor }, inactive: { base: this.inactiveColor } };
    this.thumbStyle = { height: this.thumbnailSize, width: this.thumbnailSize, boxShadow: this.thumbnailBoxShadow };

    this.state = {
      enabled: this.props.enabled || false
    };
  }

  render() {
    return (
      <ToggleButton
        colors={this.colors}
        thumbStyle={this.thumbStyle}
        thumbAnimateRange={this.thumnailAnimateRange}
        value={this.state.enabled}
        onToggle={() => { this.setState({ enabled: !this.state.enabled }); }}/>
    );
  }
}

export default ToggleBtn;