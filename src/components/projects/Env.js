import React, { Component } from 'react';
import FormInput from '../shared/form/FormInput';

class Env extends Component {

  constructor(props) {
    super(props);
    this.serialize = this.serialize.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    // Do these separately so they both show up as invalid if that's the case.
    const nameValid = this.name.isValid();
    const valueValid = this.value.isValid();

    return nameValid && valueValid;
  }

  serialize() {
    return {
      uid: this.props.uid,
      name: this.name.serialize(),
      value: this.value.serialize()
    };
  }

  render() {
    const name = this.props.name;
    const value = this.props.value;
    const uid = this.props.uid;
    const idx = this.props.idx;
    const disabled = this.props.disabled;

    return (
      <div className="env">
        <FormInput key={Math.random().toString()} required={true} placeholder="NAME" defaultValue={name} disabled={disabled} ref={(r) => { this.name = r; }}/>
        <FormInput key={Math.random().toString()} required={true} placeholder="VALUE" defaultValue={value} disabled={disabled} ref={(r) => { this.value = r; }}/>
        <div className="remove-env" onClick={() => { this.props.removeEnv(uid, idx); }}>&times;</div>
      </div>
    );
  }
}

export default Env;