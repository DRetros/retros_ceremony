import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dashboard from './../Dashboard'
import Game from './Game'
import SignInNear from './SignInNear'
import TopNavBar from './TopNavBar'
import SideBar from './SideBar'
import LoadGameScreen from './LoadGameScreen'

export default () => {
  const settings = useSelector(state => state.retrospective.settings3box)

  if (!settings.profile) {
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
                <Dashboard></Dashboard>
              </Route>
              <Route path='/loading/:gameId' component={LoadGameScreen} />
              <Route path='/game/:gameId' component={Game} />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

