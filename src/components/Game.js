import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'

import Column from './Column'
import ActionItems from './ActionItems'

function Game () {
  const columns = useSelector(state => state.retrospective.columns)
  const { gameId } = useParams()
  const firebase = useFirebase()

  useFirebaseConnect([`retrospectives/${gameId}`])

  const gameSettings = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].settings
  )

  const nextStep = () => {
    if (!gameSettings) {
      return
    }

    let currentStep = 1
    if (gameSettings && gameSettings.step) {
      currentStep = gameSettings.step
    }

    if (currentStep === 3) {
      return
    }

    firebase.update(`retrospectives/${gameId}/settings`, {
      step: currentStep + 1
    })
  }

  const prevStep = () => {
    if (!gameSettings) {
      return
    }

    let currentStep = 1
    if (gameSettings && gameSettings.step) {
      currentStep = gameSettings.step
    }

    if (currentStep === 1) {
      return
    }

    firebase.update(`retrospectives/${gameId}/settings`, {
      step: currentStep - 1
    })
  }

  useEffect(() => {
    if (isLoaded(gameSettings) && !gameSettings) {
      firebase.update(`retrospectives/${gameId}/settings`, {
        step: 1
      })
    }
  })

  const getStepTitle = step => {
    const titles = [
      'Write some ideas...',
      "Vote. What's more important?",
      'Define action items'
    ]

    return titles[step - 1]
  }

  if (!isLoaded(gameSettings) || !gameSettings) {
    return 'Loading...'
  }

  return (
    <div className='d-flex flex-column'>
      <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 class='h2'>
          {gameSettings ? getStepTitle(gameSettings.step) : getStepTitle(1)}
        </h1>
        <div class='btn-toolbar mb-2 mb-md-0'>
          <div class='btn-group mr-2'>
            <button class='btn btn-sm btn-outline-secondary' onClick={prevStep}>
              Prev
            </button>
            <button class='btn btn-sm btn-outline-secondary' onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      </div>

      {gameSettings.step === 3 ? <ActionItems /> : ''}
      <div className='d-flex flex-row justify-content-around'>
        {columns.map((column, index) => (
          <Column column={column} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Game
