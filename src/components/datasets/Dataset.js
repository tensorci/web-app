import React, { Component } from 'react';

class Dataset extends Component {

  render() {
    const info = this.props.info || {};

    return (
      <div className="card">
        <div className="card-header">
          <div className="title">
            <i className="dataset-icon fa fa-table"></i>
            {info.name}
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
                <td>{info.retrain_step_size || 'Not set'}</td>
                <td>{info.last_train_record_count || 'Not trained yet'}</td>
                <td>{info.created_at}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dataset;