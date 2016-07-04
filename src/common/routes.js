import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import SignIn from './components/SignIn';
import ChatContainer from './containers/ChatContainer';
import ChannelContainer from './containers/ChannelContainer';
import SignUp from './components/SignUp';
import WelcomePage from './components/WelcomePage';
import App from './containers/App';
import {checkAuth} from './actions/authActions';
import ChannelList from './components/ChannelList'

const requireAuth = (nextState, replace) => {
  if(!checkAuth()) {
    return replace(null, '/signin')
  }
}
const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ChannelContainer} />
    <Route path="/channel" component={ChannelContainer} />
    <Route path="/welcome" component={WelcomePage} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/chat" component={ChatContainer}>
    </Route>
  </Route>
);

export default Routes;
