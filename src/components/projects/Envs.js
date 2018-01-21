import React from 'react';
import Ajax from '../../utils/Ajax';
import Form from '../shared/form/Form';
import Env from './Env';

class Envs extends Form {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.getEnvs = this.getEnvs.bind(this);
    this.removeEnv = this.removeEnv.bind(this);
    this.addEnvInput = this.addEnvInput.bind(this);
  }

  componentDidMount() {
    const payload = {
      team: this.props.team,
      repo: this.props.repo
    };

    Ajax.get('/api/envs', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ values: data.envs });
      });
  }

  componentDidUpdate() {
    if (this.state.status === this.status.SERIALIZING && this.formValid()) {
      this.submit();
    }

    return true;
  }

  submit() {
    this.setState({ status: this.status.SENDING });

    const payload = {
      team: this.props.team,
      repo: this.props.repo,
      envs: this.state.values
    };

    Ajax.put('/api/envs', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          status: this.status.STATIC,
          values: data.envs
        });
      });
  }

  getEnvs() {
    return this.state.values.map((env, i) => {
      return <Env key={i} name={env.name} value={env.value} uid={env.uid} removeEnv={this.removeEnv} disabled={this.state.status === this.status.SENDING}/>;
    });
  }

  removeEnv(uid) {
    this.setState({ status: this.status.SENDING });

    const payload = {
      team: this.props.team,
      repo: this.props.repo,
      uid: uid
    };

    Ajax.delete('/api/env', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          status: this.status.STATIC,
          values: data.envs
        });
      });
  }

  addEnvInput() {
    // Serialize current values (without updating status to SERIALIZING)
    var values = this.serialize(true);

    if (values.length > 0) {
      const lastEnv = values[values.length - 1];

      // Don't allow more than one empty env at a time
      if (!lastEnv.name && !lastEnv.value) {
        return;
      }
    }

    // Add an empty env
    values.push({
      name: '',
      value: ''
    });

    // Update state
    this.setState({ values: values });
  }

  render() {
    return (
      <div className="envs-container">
        <div className="envs">{this.getEnvs()}</div>
        <div className="action-btns">
          <button className="primary large" onClick={this.addEnvInput}>
            <i className="plus">+</i>
            <span>New Environment Variable</span>
          </button>
          <button className="primary large" onClick={this.serialize}>Save</button>
        </div>
      </div>
    );
  }
}

export default Envs;