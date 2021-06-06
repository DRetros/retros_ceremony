import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useParams, Redirect } from 'react-router-dom'

import Storage from '../services/StorageService'
import Column from './Column'
import ActionItems from './ActionItems'

const storage = new Storage()
function LoadGameScreen () {
  const { gameId } = useParams()
  const settings = useSelector(state => state.retrospective.settings3box)
  const firebase = useFirebase()
  const [isReady, setIsReady] = useState(false)

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
  console.log('cards', cards)

  useEffect(() => {
    async function loadRetrospective() {
      // const retro = await storage.getRetrospective(settings.space, gameId)
      const retro = {
        cards: []
      }
      console.log('loading', retro)
      if (retro.cards) {
        Object.keys(retro.cards).forEach(key => {
          firebase.push(`retrospectives/${gameId}/cards`, retro.cards[key])
        })
      }
      firebase.update(`retrospectives/${gameId}/settings`, {
        status: 'open',
        ...gameSettings
      })
      setIsReady(true)
    }

    loadRetrospective()
  }, [])

  if (isReady) {
    return <Redirect to={`/game/${gameId}`} />
  }

  return <div>Loading game...</div>
}

export default LoadGameScreen
