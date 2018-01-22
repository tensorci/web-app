import React, { Component } from 'react';
import ToggleBtn from '../shared/ToggleBtn';

class ProjectWebhooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      github: {
        enabled: false
      },
      slack: {
        enabled: false,
        channel: null
      }
    };
  }

  render() {
    return (
      <div className="main-content">
        <div className="project-settings-inner webhooks">
          <legend>Webhooks</legend>
          <div className="card">
            <div className="card-header">
              <div className="title">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/github.svg" alt="Github"/>
              </div>
              <div className="right-side">
                <ToggleBtn enabled={this.state.github.enabled}/>
              </div>
            </div>
            <div className="card-body">
              <p>Automatically deploy to the TensorCI training cluster when a new commit is pushed to master.</p>
              <p>Coming soon.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="title">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/slack.svg" alt="Slack"/>
              </div>
              <div className="right-side">
                <ToggleBtn enabled={this.state.slack.enabled}/>
              </div>
            </div>
            <div className="card-body">
              <p>Pipe deployment status updates to the Slack channel of your choice.</p>
              <p>Coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectWebhooks;