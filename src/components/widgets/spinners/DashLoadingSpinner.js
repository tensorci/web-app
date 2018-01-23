import React, { Component } from 'react';

class DashLoadingSpinner extends Component {

  render() {
    return (
      <div className="holder">
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