import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dashboard from './../Dashboard'
import Game from './Game'
import SignInNear from './SignInNear'
import TopNavBar from './TopNavBar'
import SideBar from './SideBar'
import LoadGameScreen from './LoadGameScreen'
import { useFirebaseConnect } from 'react-redux-firebase'

export default ({ contract, currentUser }) => {
  const settings = useSelector(state => state.retrospective.settings3box)
  useFirebaseConnect([`retrospectives/123`])

  if (!currentUser) {
    return <SignInNear />
  }

  return (
    <div className='site-wrapper'>
      <div className='site-wrapper-inner'>
        <TopNavBar></TopNavBar>
        <div class='container-fluid'>
          <div class='row'>
            <SideBar></SideBar>
            <main role='main' class='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
              <BrowserRouter />
              <Route exact path='/'>
                <Dashboard
                  contract={contract}
                  currentUser={currentUser}
                ></Dashboard>
              </Route>
              <Route path='/loading/:gameId' component={LoadGameScreen} />
              <Route path='/game/:gameId'>
                <Game contract={contract} currentUser={currentUser} />
              </Route>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
