import React, { Component } from 'react';
import FormInput from '../shared/form/FormInput';

class Env extends Component {

  constructor(props) {
    super(props);
    this.serialize = this.serialize.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    return this.name.isValid() && this.value.isValid();
  }

  serialize() {
    return {
      name: this.name.serialize(),
      value: this.value.serialize()
    };
  }

  render() {
    const name = this.props.name;
    const value = this.props.value;
    const uid = this.props.uid;
    const disabled = this.props.disabled;

    return (
      <div className="env">
        <FormInput required={true} placeholder="NAME" defaultValue={name} disabled={disabled} ref={(r) => { this.name = r; }}/>
        <FormInput required={true} placeholder="VALUE" defaultValue={value} disabled={disabled} ref={(r) => { this.name = r; }}/>
        <button className="remove-env" onClick={() => { this.props.removeEnv(uid); }}>&times;</button>
      </div>
    );
  }
}

export default Env;