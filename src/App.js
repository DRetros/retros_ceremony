import React, { Component } from 'react';
import { Provider } from "react-redux";

import Profile from './Profile.js';
import Signin from './Signin.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';
import Game from './components/Game.js';

import store from './redux/store'

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <Game></Game>
            {/* { !userSession.isUserSignedIn() ?
              <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
              : <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
            } */}
          </div>
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}
