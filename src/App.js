import React, { Component } from 'react'
import { Provider } from 'react-redux'
import * as firebase from 'firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import Profile from './Profile.js'
import Signin from './Signin.js'
import { UserSession, AppConfig } from 'blockstack'
import Game from './components/Game.js'

import store from './redux/store'

const fbConfig = {
  apiKey: "AIzaSyCRk9L1YDq-0gKLbBGXttPtADE71V8SsM0",
  authDomain: "dretros-8ed83.firebaseapp.com",
  databaseURL: "https://dretros-8ed83.firebaseio.com",
  projectId: "dretros-8ed83",
  storageBucket: "dretros-8ed83.appspot.com",
  messagingSenderId: "771301618292",
  appId: "1:771301618292:web:71328227e783da5107d721",
  measurementId: "G-7041M57B9J"
}
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {
  handleSignIn (e) {
    e.preventDefault()
    userSession.redirectToSignIn()
  }

  handleSignOut (e) {
    e.preventDefault()
    userSession.signUserOut(window.location.origin)
  }

  render () {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <div className='site-wrapper'>
            <div className='site-wrapper-inner'>
              <Game />
              {/* { !userSession.isUserSignedIn() ?
              <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
              : <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
            } */}
            </div>
          </div>
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }

  componentDidMount () {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/')
        this.setState({ userData: userData })
      })
    }
  }
}
