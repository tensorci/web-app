import React, { Component } from 'react';

class DashLoadingSpinner extends Component {

  render() {
    // Styling found at chasing-tail-spinner.scss
    return (
      <div className="spin-holder">
        <div className="preloader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default DashLoadingSpinner;