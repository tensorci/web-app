import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DatasetPreview from './DatasetPreview';
import moment from 'moment';
import $ from 'jquery';

class Dataset extends Component {

  constructor(props) {
    super(props);
    this.getStepSizes = this.getStepSizes.bind(this);
    this.getRetrainStepSize = this.getRetrainStepSize.bind(this);
    this.stepSizeNotSet = 'Never';
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
    const retrainStepSize = info.retrain_step_size;

    // if user has write access to dataset, allow them to edit the retrain step-size
    if (info.has_write_access) {
      const defaultVal = retrainStepSize ? retrainStepSize.toString() : this.stepSizeNotSet;

      return (
        <select name="select-retrain-ss" className="select-retrain-ss" ref={(ref) => { this.stepSizeSelect = ref; }} defaultValue={defaultVal}>
          {this.getStepSizes().map((size, i) => {
            return <option value={size.toString()} key={i}>{size}</option>;
          })}
        </select>
      );
    } else {
      return <span>{retrainStepSize || this.stepSizeNotSet}</span>;
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
          </div>
          <div className="dataset-actions">
            {this.getSaveDatasetBtn(info)}
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
                <td>{info.created_at ? moment(info.created_at * 1000).format('MMMM Do YYYY, h:mm:ss a') : null}</td>
              </tr>
            </tbody>
          </table>
          <div className="preview-container">
            <DatasetPreview preview={info.preview}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dataset;