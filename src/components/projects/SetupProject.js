import React, { Component } from 'react';

class SetupProject extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div className="main-body">
        <div id="setupProject">
          <div className="card">
            <div className="card-header">
              <div className="title">Setup Project</div>
            </div>
            <div className="card-body">
              <p>TensorCI helps you manage machine learning apps, better. To kick things off, you'll need to add a <code>.tensorci.yml</code> file to the root of your project and commit that to GitHub. After that, we'll start a new build for you each time someone pushes a new commit.</p>
              <p>Select from the following languages to generate a sample .yml for your project.</p>
              <div>
                <div>
                  <div className="languages">
                    <h2>Language</h2>
                    <div className="language-list">
                      <ul>
                        <li className="radio">
                          <input type="radio" id="Python" checked/>
                          <label htmlFor="Python">
                            <i className="material-icons">settings</i>
                            Python
                          </label>
                        </li>
                      </ul>
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