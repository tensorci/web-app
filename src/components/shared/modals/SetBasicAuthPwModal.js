import React from 'react';
import History from '../../../utils/History';
import Modal from '../Modal';

class SetBasicAuthPwModal extends Modal {

  constructor(props) {
    super(props);

    this.state.headerText = 'Welcome!';
    this.state.posBtnText = 'Let\'s do it';
    this.state.negBtnText = 'No thanks';
    this.state.width = 500;
    this.state.height = 260;
    this.state.modalName = 'basic-auth-pw';

    this.onPosClick = this.onPosClick.bind(this);
  }

  onPosClick() {
    this.hide();
    History.push('/account/auth');
  }
}

export default SetBasicAuthPwModal;