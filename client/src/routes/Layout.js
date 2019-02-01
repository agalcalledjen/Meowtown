import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import Menu from '../components/Menu/Menu';
import { ViewerContext } from '../context/ViewerProvider';
import FullScreenLoader from '../components/FullScreenLoader';

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <FullScreenLoader inverted />;
        if (viewer) {
          return (
            <Fragment>
              <Menu />
              <Switch>
                <Route exact path="/items" component={Items} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/:userid" component={Profile} />
                <Route exact path="/share" component={Share} />
                <Redirect from="*" to="/items" />
              </Switch>
            </Fragment>
          );
        } else {
          return (
            <Switch>
              <Route exact path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
      }}
    </ViewerContext.Consumer>
  </Fragment>
);

{
  /**
   * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
   *
   * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
   *
   * Later, we'll add logic to send users to one set of routes if they're logged in,
   * or only view the /welcome page if they are not.
   */
}
