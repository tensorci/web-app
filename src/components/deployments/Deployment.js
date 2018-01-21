import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DeploymentStages from './DeploymentStages';
import DeploymentStatusBadge from './DeploymentStatusBadge';
import pubnub from '../../utils/PubSub';
import timeago from 'timeago.js';

class Deployment extends Component {

  constructor(props) {
    super(props);

    this.listenForStageUpdates = this.listenForStageUpdates.bind(this);
    this.heardStageUpdate = this.heardStageUpdate.bind(this);

    this.state = {
      status: null,
      failed: false,
      succeeded: false,
      date: null,
      triggeredBy: null,
      commit: {},
      bool: false  // flipped to force state update --> might be able to just use forceUpdate()
    };

    this.currentStage = null;
    this.stages = {};
  }

  componentDidMount() {
    Ajax.get('/api/deployment', { uid: this.props.uid })
      .then((resp) => resp.json())
      .then((data) => {
        this.currentStage = data.current_stage;
        this.stages = data.stages || {};

        this.listenForStageUpdates();

        this.setState({
          status: data.readable_status,
          failed: data.failed,
          succeeded: data.succeeded,
          date: data.date,
          triggeredBy: data.triggered_by,
          commit: data.commit || {}
        });
      });
  }

  listenForStageUpdates() {
    pubnub.addListener({ message: (m) => {
      this.heardStageUpdate(m.message);
    }});

    pubnub.subscribe({ channels: [this.props.uid] });
  }

  heardStageUpdate(data) {
    const stageSlugs = Object.keys(data);

    if (!stageSlugs) {
      return;
    }

    // We're only ever updating one stage at a time.
    const stageSlug = stageSlugs[0];
    const stageInfo = data[stageSlug];

    // Ensure this is a valid stage/update.
    if (!stageSlug || !stageInfo || !this.stages[stageSlug]) {
      return;
    }

    // Mark the updated stage as the current stage.
    this.currentStage = stageSlug;

    // Update this stage in our stage data map.
    this.stages[stageSlug] = stageInfo;

    // Get ref to orderedStages from DeploymentStages.
    const orderedStages = this.stagesRef.orderedStages;

    // Figure out what the previous stage's index is.
    const prevStageIndex = orderedStages.indexOf(stageSlug) - 1;

    // If a previous stage exists (its index isn't -1), update its data to succeeded=true in case
    // we're just now moving to a new stage.
    if (prevStageIndex >= 0) {
      const prevStageSlug = orderedStages[prevStageIndex];
      this.stages[prevStageSlug].succeeded = true;
    }

    // Get ref to current stage component from DeploymentStages.
    const currStageComp = this.stagesRef[stageSlug];

    // If the stage component already exists, update it alone.
    if (currStageComp) {
      currStageComp.setState(stageInfo);
    } else {
      // If the stage doesn't yet exist, re-render everything by updating this comp's state.
      // Everything should update properly since we already updated our stage map (this.stages).
      this.setState({ bool: !this.state.bool });
    }
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const commit = this.state.commit;

    return (
      <div id="deployment" className="main-body">
        <div className="build-info-v2">
          <div>
            <div className="build-head">
              <div className="build-head-content">
                <div className="summary-header">
                  <div className="build-head-summary-header">
                    <div className="summary-item">
                      <DeploymentStatusBadge status={this.state.status} failed={this.state.failed} succeeded={this.state.succeeded}/>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Started:</span>
                      <span>{this.state.date ? timeago().format(this.state.date * 1000) : null}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Triggered by:</span>
                      <a href={'https://github.com/' + this.state.triggeredBy} target="_blank" rel="noopener noreferrer">{this.state.triggeredBy}</a>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="build-head-commits">
                      <div className="heading">Commit</div>
                      <div className="build-commits">
                        <div className="build-commits-list">
                          <div className="commit-line">
                            <span className="metadata-item">
                              <a href={'https://github.com/' + commit.author} target="_blank" rel="noopener noreferrer">{commit.author}</a>
                            </span>
                            <i className="octicon octicon-git-commit"></i>
                            <a href={'https://github.com/' + team + '/' + repo + '/commit/' + commit.sha} className="metadata-item sha-one" target="_blank" rel="noopener noreferrer">{(commit.sha || '').slice(0, 7)}</a>
                            <span className="commit-message">{commit.message}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DeploymentStages stages={this.stages} currentStage={this.currentStage} ref={(r) => { this.stagesRef = r; }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Deployment;