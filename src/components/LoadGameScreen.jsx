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

  const cards = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].cards
  )
  console.log('cards', cards)

  useEffect(() => {
    async function loadRetrospective() {
      const retro = await storage.getRetrospective(settings.space, gameId)
      console.log('loading', retro)
      Object.keys(retro.cards).forEach(key => {
        firebase.push(`retrospectives/${gameId}/cards`, retro.cards[key])
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
