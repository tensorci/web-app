import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import banner from '../../utils/Banner';
import History from '../../utils/History';
import Link from '../../utils/Link';
import SpinnerBtn from '../shared/SpinnerBtn';

class SetupProject extends Component {

  constructor(props) {
    super(props);

    this.yaml = `# Python TensorCI configuration file
#
# Check https://www.tensorci.com/docs for more details
#
model: path/to/model/file
prepro_data: module1.module2:function
train: module1.module2:function
test: module1.module2:function
predict: module1.module2:function
reload_model: module1.module2:function`;

    this.gitUrl = this.gitUrl.bind(this);
    this.launchProject = this.launchProject.bind(this);
    this.startTraining = this.startTraining.bind(this);
  }

  gitUrl() {
    return 'https://github.com/' + this.props.team + '/' + this.props.repo + '.git';
  }

  launchProject() {
    Ajax.post('/api/repo/register', { git_url: this.gitUrl() }, (data, failed) => {
      if (failed) {
        banner.error('Failed to launch project.');
        this.launchBtn.static();
        return;
      }

      this.launchBtn.complete();
    });
  }

  startTraining() {
    const payload = {
      git_url: this.gitUrl(),
      with_log_stream: false
    };

    Ajax.post('/api/deployment/train', payload, (data, failed) => {
      if (failed) {
        banner.error('Failed to start training deployment.');
        this.startTrainingBtn.static();
        return;
      }

      // redirect to deployments page
      History.push('/' + this.props.team + '/' + this.props.repo);
    });
  }

  render() {
    return (
      <div className="main-body">
        <div id="setupProject">
          <div className="card">
            <div className="card-header">
              <div className="title">Setup Project</div>
            </div>
            <div className="card-body">
              <p>TensorCI helps you manage machine learning apps more efficiently. To kick things off, you'll need to add a <code>.tensorci.yml</code> file to the root of your project and commit that to GitHub. After that, we'll start a new build for you each time someone pushes a new commit.</p>
              <p>Select from the following languages to generate a sample .yml for your project.</p>
              <div>
                <div>
                  <div className="languages">
                    <h2>Language</h2>
                    <div className="language-list">
                      <ul>
                        <li className="radio">
                          <input type="radio" id="Python" defaultChecked={true}/>
                          <label htmlFor="Python">
                            <i className="material-icons">settings</i>
                            Python
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h2>Next Steps</h2>
                    <p>We're going to walk you through setting up a configuration file, committing it, and making your first train deploy.</p>
                    <p>Want to skip ahead? Jump right <a href="#">into our documentation</a>.</p>
                    <div className="checklist">
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1.</td>
                            <td>
                              <p>Add a file named <code>.tensorci.yml</code> to the root of your project.</p>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>2.</td>
                            <td>
                              <p>Populate <code>.tensorci.yml</code> with the contents of the sample .yml (shown below).</p>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>3.</td>
                            <td>
                              <p>Update the sample .yml to reflect your project's configuration.</p>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>4.</td>
                            <td>
                              <p>Push this change up to GitHub.</p>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>5.</td>
                            <td>
                              <p>Officially launch project.</p>
                            </td>
                            <td>
                              <SpinnerBtn
                                className="checklist-btn primary"
                                onClick={this.launchProject}
                                completeText="Launched"
                                minLoadingDuration={1000}
                                infiniteComplete={true}
                                ref={(ref) => { this.launchBtn = ref; }}>
                                Launch project
                              </SpinnerBtn>
                            </td>
                          </tr>
                          <tr>
                            <td>5.</td>
                            <td>
                              <p>Create a dataset for your project.</p>
                            </td>
                            <td>
                              <Link href={'/datasets/' + this.props.team} className="button checklist-btn secondary">View datasets</Link>
                            </td>
                          </tr>
                          <tr>
                            <td>6.</td>
                            <td>
                              <p>Start training! You can use either the CLI or the dashboard to kick off a new training build.</p>
                            </td>
                            <td>
                              <SpinnerBtn className="checklist-btn secondary" onClick={this.startTraining} ref={(r) => { this.startTrainingBtn = r; }}>Start training</SpinnerBtn>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h2>Sample .yml File</h2>
                      <div>
                        <div className="build-config-string">
                          <pre className="line-numbers language-yaml">
                            <code className="config-yml language-yaml">{this.yaml}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SetupProject;