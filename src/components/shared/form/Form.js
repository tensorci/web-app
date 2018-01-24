import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);

    this.status = {
      STATIC: 0,
      SERIALIZING: 1,
      SENDING: 2,
      COMPLETE: 3
    };

    this.state = {
      status: this.status.STATIC,
      values: this.props.values || []
    };

    this.formCompRefs = [];
    this.pushFormCompRef = this.pushFormCompRef.bind(this);
    this.serialize = this.serialize.bind(this);
  }

  pushFormCompRef(ref) {
    if (ref) {
      this.formCompRefs.push(ref);
    }
  }

  formValid(silent) {
    var isValid = true;

    this.formCompRefs.forEach((ref) => {
      if (!ref.isValid(silent)) {
        isValid = false;
      }
    });

    return isValid;
  }
  
  serialize(inPlace) {
    const values = this.formCompRefs.map((ref) => {
      return ref.serialize();
    });

    if (inPlace) {
      return values;
    } else {
      this.setState({
        values: values,
        status: this.status.SERIALIZING
      });
    }
  }
}

export default Form;