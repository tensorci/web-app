import React from 'react';
import Ajax from '../../utils/Ajax';
import Env from './Env';
import Form from '../shared/form/Form';

class Envs extends Form {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.getEnvs = this.getEnvs.bind(this);
    this.removeEnv = this.removeEnv.bind(this);
    this.addEnvInput = this.addEnvInput.bind(this);
    this.save = this.save.bind(this);
    this.clusterName = this.clusterName.bind(this);
  }

  componentDidUpdate() {
    if (this.state.status === this.status.SERIALIZING && this.formValid()) {
      this.submit();
    }

    return true;
  }

  submit() {
    this.setState({ status: this.status.SENDING });

    var envs = {};
    this.state.values.forEach((env) => {
      envs[env.name] = env.value;
    });

    const payload = {
      team: this.props.team,
      repo: this.props.repo,
      forCluster: this.props.forCluster,
      envs: envs
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
    this.formCompRefs = [];

    return this.state.values.map((env, i) => {
      return (
        <Env
          key={Math.random().toString()}
          idx={i}
          name={env.name}
          value={env.value}
          uid={env.uid}
          removeEnv={this.removeEnv}
          disabled={this.state.status === this.status.SENDING}
          ref={this.pushFormCompRef}/>
      );
    });
  }

  removeEnv(uid, idx) {
    // If uid doesn't exist, it's a new env, so just remove on the FE.
    if (!uid) {
      // Serialize current values (without updating status to SERIALIZING).
      var values = this.serialize(true);

      // Remove env data at index idx.
      values.splice(idx, 1);

      // remove ref from formCompRefs
      this.formCompRefs.splice(idx, 1);

      // Update state.
      this.setState({ values: values });
      return;
    }

    // uid exists, so delete the env from the BE and then update state.

    this.setState({ status: this.status.SENDING });

    Ajax.delete('/api/env', { uid: uid })
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
      uid: null,
      name: null,
      value: null
    });

    // Update state
    this.setState({ values: values });
  }

  save() {
    if (this.state.values.length === 0) {
      return;
    }

    this.serialize(false);
  }

  clusterName() {
    return {
      train: 'Training',
      api: 'API'
    }[this.props.forCluster];
  }

  render() {
    return (
      <div className="envs-container">
        <div className="envs">{this.getEnvs()}</div>
        <div className="action-btns">
          <button className="primary small" onClick={this.addEnvInput}>
            <span className="plus">+</span>
            {'New ' + this.clusterName() + ' Environment Variable'}
          </button>
        </div>
      </div>
    );
  }
}

export default Envs;