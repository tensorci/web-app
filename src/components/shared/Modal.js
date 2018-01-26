import React, { Component } from 'react';
import Rodal from 'rodal';

class Modal extends Component {

  constructor(props) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.getFooter = this.getFooter.bind(this);
    this.onPosClick = this.onPosClick.bind(this);
    this.onNegClick = this.onNegClick.bind(this);

    this.state = {
      visible: false
    };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  getHeader() {
    if (!this.state.headerText) {
      return;
    }

    return <div className="modal-header">{this.state.headerText}</div>;
  }

  getFooter() {
    const posText = this.state.posBtnText;
    const negText = this.state.negBtnText;

    if (!posText && !negText) {
      return;
    }

    var buttons = [];
    const btnCountClass = (posText && negText) ? 'btn2' : 'btn1';

    if (negText) {
      buttons.push(<button key="neg" className={'modal-btn negative ' + btnCountClass} onClick={this.onNegClick}>{negText}</button>);
    }

    if (posText) {
      buttons.push(<button key="pos" className={'modal-btn positive primary ' + btnCountClass} onClick={this.onPosClick}>{posText}</button>);
    }

    return <div className="modal-footer">{buttons}</div>;
  }

  onPosClick() {
    if (this.props.onPosClick) {
      this.props.onPosClick();
    }

    this.hide();
  }

  onNegClick() {
    if (this.props.onNegClick) {
      this.props.onNegClick();
    }

    this.hide();
  }

  render() {
    return (
      <div className={'tci-modal' + (this.state.modalName ? (' ' + this.state.modalName) : '')}>
        <Rodal
          width={this.state.width || 400}
          height={this.state.height || 240}
          visible={this.state.visible}
          onClose={this.hide}>
          {this.getHeader()}
          <div className="modal-body">
            {this.props.children}
          </div>
          {this.getFooter()}
        </Rodal>
      </div>
    );
  }
}

export default Modal;