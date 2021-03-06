import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import Big from 'big.js';

import Storage from '../services/StorageService'
import Column from './Column'
import ActionItems from './ActionItems'

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const storage = new Storage()

function Game ({ contract }) {
  console.log('contract', contract)
  const columns = useSelector(state => state.retrospective.columns)
  const settings = useSelector(state => state.retrospective.settings3box)
  const { gameId } = useParams()
  const firebase = useFirebase()
  const [game3Box, setGame3Box] = useState([])

  // useEffect(() => {
  //   async function loadingGame3Box () {
  //     let date = new Date();
  //     let lastOpened = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" +date.getFullYear() + " " +("00" + date.getHours()).slice(-2) + ":" +("00" + date.getMinutes()).slice(-2) + ":" +("00" + date.getSeconds()).slice(-2)
  //     const storage = new Storage();
  //     let retrospective = await storage.getRetrospective(settings.box, gameId);
  //     storage.updateRetrospectiveMetaData(retrospective, "lastOpened", lastOpened);
  //     setGame3Box(retrospective);
  //   }
  //   loadingGame3Box()
  // }, [])
  const colors = ['#48efb1', '#EF4875', '#867BFF']
  const icons = [
    'fas fa-check-circle',
    'fas fa-times-circle',
    'fas fa-arrow-circle-up'
  ]

  useFirebaseConnect([`retrospectives/${gameId}`])

  const gameSettings = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].settings
  )

  const cards = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].cards
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

  const onClickHandler = async () => {
    console.log(cards)
    await contract.addMessage(
      { text: JSON.stringify({
        gameId,
        cards
      }) },
      BOATLOAD_OF_GAS,
      Big('0').times(10 ** 24).toFixed()
    ).then(() => {
      alert('success')
    });

    console.log('clear fb')
    firebase.remove(`retrospectives/${gameId}/cards`)
    firebase.update(`retrospectives/${gameId}/settings`, {
      status: 'closed',
      ...gameSettings
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

  if (gameSettings.status !== 'open') {
    return 'This retros was closed by the owner'
  }

  return (
    <div className='d-flex flex-column'>
      <div>
        <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
          {gameSettings ? (
            <h1>{getStepTitle(gameSettings.step)}</h1>
          ) : (
            <h1>{getStepTitle(1)}</h1>
          )}
          <div class='btn-toolbar mb-2 mb-md-0'>
            <div class='btn-group' role='group' aria-label='Basic example'>
              <button
                type='button'
                onClick={prevStep}
                class='btn btn-secondary'
              >
                Prev Step
              </button>
              <button
                type='button'
                onClick={nextStep}
                class='btn btn-secondary'
              >
                Next Step
              </button>
              <button
                class='btn btn-primary'
                type='button'
                onClick={onClickHandler}
              >
                Save and finish
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
        <br></br>
        {/* <h3>With 3box, retro {`${game3Box['_name']}`.replace('dretros-','')}</h3>
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
          <Column column={column} key={index} rgbColor={colors[index]} iconCss={icons[index]} />
        ))} */}
      </div>
    </div>
  )
}

export default Game
