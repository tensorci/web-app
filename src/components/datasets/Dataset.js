import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import moment from 'moment';
import $ from 'jquery';

class Dataset extends Component {

  constructor(props) {
    super(props);
    this.getStepSizes = this.getStepSizes.bind(this);
    this.getRetrainStepSize = this.getRetrainStepSize.bind(this);
    
    this.stepSizeNotSet = this.stepSizeNotSet;
  }
  
  getStepSizes() {
    var size = 0;
    var step = 50;
    var maxStep = 1000;
    var sizes = [];

    while (size <= maxStep) {
      sizes.push(size);
      size += step;
    }

    sizes[0] = this.stepSizeNotSet;

    return sizes;
  }

  getRetrainStepSize(info) {
    // if user has write access to dataset, allow them to edit the retrain step-size
    if (info.has_write_access) {
      return (
        <select name="select-retrain-ss" className="select-retrain-ss" ref={(ref) => { this.stepSizeSelect = ref; }}>
          {this.getStepSizes().map((size, i) => {
            // if no value set, auto choose the first one. If it is set, choose that value.
            if ((!info.retrain_step_size && i === 0) || info.retrain_step_size.toString() === size.toString()) {
              return <option value={size.toString()} key={i} selected>{size}</option>;  
            } else {
              return <option value={size.toString()} key={i}>{size}</option>;
            }
          })}
        </select>
      );
    } else {
      return <span>{info.retrain_step_size || this.stepSizeNotSet}</span>;
    }
  }

  getSaveDatasetBtn(info) {
    if (!info.has_write_access) {
      return;
    }

    return <button className="primary small" onClick={() => { this.saveDataset(info.uid); }}>Update dataset</button>;
  }

  saveDataset(uid) {
    var stepSize = $(this.stepSizeSelect).val();

    if (stepSize === this.stepSizeNotSet) {
      stepSize = 0;
    } else {
      stepSize = Number(stepSize);
    }

    const payload = {
      uid: uid,
      retrainStepSize: stepSize
    };

    Ajax.put('/api/dataset', payload)
      .then((resp) => {
        if (resp.status === 200) {
          // success
        } else {
          // error
        }
      });
  }

  render() {
    const info = this.props.info || {};

    return (
      <div className="card">
        <div className="card-header">
          <div className="title">
            <i className="dataset-icon fa fa-table"></i>
            {info.name}
            <div className="pull-right">
              {this.getSaveDatasetBtn(info)}
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Record Count</th>
                <th>Retrain Step Size</th>
                <th>Last Trained With Record Count</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{info.num_records}</td>
                <td>{this.getRetrainStepSize(info)}</td>
                <td>{info.last_train_record_count || 'Not trained yet'}</td>
                <td>{moment(info.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dataset;