import Modal from '../Modal';
import React from 'react';

class DemoModal extends Modal {

  constructor(props) {
    super(props);

    this.state.headerText = 'Welcome!';
    this.state.posBtnText = 'Let\'s do it';
    this.state.width = 500;
    this.state.height = 260;
    this.state.modalName = 'demo';

    this.onPosClick = this.onPosClick.bind(this);
  }

  onPosClick() {
    this.hide();
  }
}

export default DemoModal;