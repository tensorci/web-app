import React, { Component } from 'react';
import banner from '../../utils/Banner';

class BannerComp extends Component {

  render() {
    return (
      <div id="banner" className="banner">
        <div className="banner-msg"></div>
        <i className="material-icons close-banner" onClick={banner.hide}>close</i>
      </div>
    );
  }
}

export default BannerComp;