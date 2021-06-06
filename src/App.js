import React, { Component } from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/database'

import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import { UserSession, AppConfig } from 'blockstack'

import store from './redux/store'
import SiteWrapper from './components/SiteWrapper.jsx'

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
console.log(firebase.initializeApp(fbConfig))

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

function App ({ contract, currentUser }) {
  console.log('currentUser', currentUser)
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <SiteWrapper contract={contract} currentUser={currentUser} />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
