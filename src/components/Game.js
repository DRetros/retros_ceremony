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

  if (!isLoaded(gameSettings)) {
    return 'Loading...'
  }

  return (
    <div className='d-flex flex-column'>
      <div>
        {gameSettings ? (
          <h1>{getStepTitle(gameSettings.step)}</h1>
        ) : (
          <h1>{getStepTitle(1)}</h1>
        )}
        <button onClick={prevStep}>Prev</button>
        <button onClick={nextStep}>Next</button>
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
