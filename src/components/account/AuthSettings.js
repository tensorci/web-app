import React, { Component } from 'react';
import $ from 'jquery';
import Ajax from '../../utils/Ajax';
import banner from '../../utils/Banner';
import FormInput from '../shared/form/FormInput';
import SpinnerBtn from '../shared/SpinnerBtn';

class AuthSettings extends Component {

  constructor(props) {
    super(props);

    this.onBasicAuthPwKeyUp = this.onBasicAuthPwKeyUp.bind(this);
    this.togglePwVisibility = this.togglePwVisibility.bind(this);
    this.saveBasicAuthPw = this.saveBasicAuthPw.bind(this);
  }

  componentDidMount() {
    Ajax.get('/api/user/password', null, (data) => {
      this.basicAuthPwInput.setValue(data.pw);
      $(this.readablePw).html(data.pw);
    });
  }

  onBasicAuthPwKeyUp(pw) {
    $(this.readablePw).html(pw);
  }

  togglePwVisibility() {
    const $pw = $(this.readablePw);
    const $toggleBtn = $(this.togglePwRef);

    if ($pw.hasClass('show')) {
      $pw.removeClass('show');
      $toggleBtn.html('Show Password');
    } else {
      $pw.addClass('show');
      $toggleBtn.html('Hide Password');
    }
  }

  saveBasicAuthPw() {
    const payload = { password: this.basicAuthPwInput.serialize() };

    Ajax.put('/api/user/password', payload, (data, failed) => {
      if (failed) {
        banner.error('Error saving password.');
        this.saveAuthBtn.static();
        return;
      }

      this.saveAuthBtn.complete();
    });
  }

  render() {
    return (
      <div className="main-content">
        <div className="account-inner">
          <legend>Auth Settings</legend>
          <div className="card">
            <div className="card-header">
              <div className="title">Basic Auth</div>
            </div>
            <div className="card-body">
              <p>This password can be used to authorize your TensorCI account in places where third-party OAuth isn't available, such as logging into the TensorCI CLI.</p>
              <div className="form">
                <div className="field">
                  <div className="field-wrapper">
                    <label>Basic Auth Password</label>
                    <div className="field">
                      <FormInput onKeyUp={this.onBasicAuthPwKeyUp} password={true} ref={(ref) => { this.basicAuthPwInput = ref; }}/>
                    </div>
                    <div className="pw-preview">
                      <div className="readable-pw" ref={(ref) => { this.readablePw = ref; }}></div>
                      <div className="pw-preview-toggle" onClick={this.togglePwVisibility} ref={(ref) => { this.togglePwRef = ref; }}>Show password</div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <SpinnerBtn
                    className="primary save-auth"
                    completeText="Saved"
                    minLoadingDuration={1000}
                    completeTime={1500}
                    onClick={this.saveBasicAuthPw}
                    ref={(r) => { this.saveAuthBtn = r; }}>
                    Save Basic Auth Password
                  </SpinnerBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthSettings;