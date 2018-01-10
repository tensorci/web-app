import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import OAuthRedirect from './components/redirects/OAuthRedirect';
import History from './utils/History';
import pathToRegexp from 'path-to-regexp';

class Main extends Component {

  constructor(props) {
    super(props);

    this.setDashboardRef = this.setDashboardRef.bind(this);

    this.routes = [
      {
        path: '/',
        comp: Dashboard,
        exact: true,
        appSection: 'deployments'
      },
      {
        path: '/oauth_redirect',
        comp: OAuthRedirect,
        exact: true
      },
      {
        path: '/projects/:team',
        comp: Dashboard,
        exact: true,
        appSection: 'projects'
      },
      {
        path: '/projects/:team/:repo',
        comp: Dashboard,
        exact: true,
        appSection: 'projects'
      },
      {
        path: '/add-projects/:team',
        comp: Dashboard,
        exact: true,
        appSection: 'projects',
        meta: {
          addProjects: true
        }
      },
      {
        path: '/datasets/:team',
        comp: Dashboard,
        exact: true,
        appSection: 'datasets'
      },
      {
        path: '/datasets/:team/:repo',
        comp: Dashboard,
        exact: true,
        appSection: 'datasets'
      },
      {
        path: '/settings/:team',
        comp: Dashboard,
        exact: true,
        appSection: 'settings'
      },
      {
        path: '/settings/:team/:repo',
        comp: Dashboard,
        exact: true,
        appSection: 'settings'
      },
      {
        path: '/:team',
        comp: Dashboard,
        exact: true,
        appSection: 'deployments'
      },
      {
        path: '/:team/:repo',
        comp: Dashboard,
        exact: true,
        appSection: 'deployments'
      }
    ];

    this.routes.forEach((r) => {
      var keys = [];
      var regex = pathToRegexp(r.path, keys);
      r.regex = regex;
      r.keys = keys;
    });
  }

  setDashboardRef(ref) {
    this.dashboard = ref;
  }

  componentDidMount() {
    History.listen((loc) => {
      this.reRoute(loc);
    });
  }

  reRoute(loc) {
    var route, match;
    const path = loc.pathname;

    for (var i = 0; i < this.routes.length; i++) {
      route = this.routes[i];

      if (!route.appSection) {
        continue;
      }

      match = route.regex.exec(path);

      if (match) {
        this.dashboard.setState({
          appSection: route.appSection,
          team: match[1],
          repo: match[2],
          meta: route.meta || {}
        });

        break;
      }
    }
  }

  getRoutes() {
    return this.routes.map((route, i) => {
      if (route.appSection) {
        return <Route key={i} exact path={route.path} render={props => <Dashboard appSection={route.appSection} meta={route.meta || {}} ref={this.setDashboardRef} {...props}/>} />;
      } else {
        if (route.exact) {
          return <Route key={i} exact path={route.path} component={route.comp} />;
        } else {
          return <Route key={i} path={route.path} component={route.comp} />;
        }
      }
    });
  }

  render() {
    return (
      <main>
        <Switch>
          {this.getRoutes()}
          <Redirect to='/' />
        </Switch>
      </main>
    );
  }
}

export default Main;
