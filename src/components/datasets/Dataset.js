import React, { Component } from 'react';
import $ from 'jquery';
import Ajax from '../../utils/Ajax';
import banner from '../../utils/Banner';
import DatasetPreview from './DatasetPreview';
import moment from 'moment';
import CircleSpinnerBtn from '../shared/CircleSpinnerBtn';

class Dataset extends Component {

  constructor(props) {
    super(props);

    this.getStepSizes = this.getStepSizes.bind(this);
    this.getRetrainStepSize = this.getRetrainStepSize.bind(this);
    this.getDatasetActionBtns = this.getDatasetActionBtns.bind(this);
    this.saveDataset = this.saveDataset.bind(this);
    this.removeDataset = this.removeDataset.bind(this);

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

  getDatasetActionBtns(info) {
    if (!info.has_write_access) {
      return;
    }

    return [
      <CircleSpinnerBtn
        key={0}
        className="cbs-secondary"
        minLoadingDuration={1000}
        completeTime={1500}
        onClick={() => { this.saveDataset(info.uid); }}
        ref={(r) => { this.updateDatasetBtn = r; }}>
        <i className="material-icons">save</i>
      </CircleSpinnerBtn>,
      <CircleSpinnerBtn
        key={1}
        className="cbs-remove"
        onClick={() => { this.removeDataset(info.uid); }}>
        <i className="material-icons">close</i>
      </CircleSpinnerBtn>,
    ];
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

    Ajax.put('/api/dataset', payload, (data, failed) => {
      if (failed) {
        banner.error('Failed to update dataset.');
        return;
      }

      this.updateDatasetBtn.complete();
    });
  }

  removeDataset (uid) {
    Ajax.delete('/api/dataset', { uid: uid }, (data, failed) => {
      if (failed) {
        banner.error('Failed to delete dataset.');
        return;
      }

      if (this.props.refresh) {
        this.props.refresh();
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
            {this.getDatasetActionBtns(info)}
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