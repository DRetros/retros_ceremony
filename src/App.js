import React, { Component } from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import firebaseDb from 'firebase/database'
import { BrowserRouter, Route } from 'react-router-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import Profile from './Profile.js'
import Signin from './Signin.js'
import { UserSession, AppConfig } from 'blockstack'
import Game from './components/Game.js'

import store from './redux/store'

const fbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
              <BrowserRouter />
              <Route exact path='/'>
                {!userSession.isUserSignedIn() ? (
                  <Signin
                    userSession={userSession}
                    handleSignIn={this.handleSignIn}
                  />
                ) : (
                  <Profile
                    userSession={userSession}
                    handleSignOut={this.handleSignOut}
                  />
                )}
              </Route>
              <Route path='/game/:gameId' component={Game} />
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
