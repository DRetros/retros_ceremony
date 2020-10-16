import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'

import Storage from '../services/StorageService'

function Card ({ card, cardId, columnTitle }) {
  const firebase = useFirebase()
  const { gameId } = useParams()
  const settings = useSelector(state => state.retrospective.settings3box)
  const [gameThread, setGameThread] = useState([])

  useEffect(() => {
    async function loading3BoxThread () {
      //const retrospective = await storage.getRetrospective(settings.box, gameId);
      //setGame3Box(retrospective);
      let storage = new Storage();

      let column3Box = await storage.createColumn(settings.account, settings.box, gameId, columnTitle);
      setGameThread(column3Box);
    }

    loading3BoxThread();
  }, []);


  useFirebaseConnect([`retrospectives/${gameId}`])

  const gameSettings = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].settings
  )

  const handleDelete = event => {
    let storage = new Storage();
    storage.deleteCard(gameThread, card.id);
    //firebase.remove(`retrospectives/${gameId}/cards/${cardId}`)
    console.log("Trying to delete " + card.description);
    console.log(card.id);
  }

  const handleAddVote = () => {
    const cardVotes = card.votes || 0
    firebase.update(`retrospectives/${gameId}/cards/${cardId}`, {
      ...card,
      votes: cardVotes + 1
    })
  }

  const handleRemoveVote = () => {
    const cardVotes = card.votes || 0
    firebase.update(`retrospectives/${gameId}/cards/${cardId}`, {
      ...card,
      votes: cardVotes - 1
    })
  }

  return (
    <div className='card my-1'>
      <div className='card-body'>
        <p className='card-text'>{card.description}</p>
        <p className='card-text'>Votes: {card.votes}</p>
        {gameSettings.step === 1 ? (
          <button onClick={handleDelete} className='btn'>
            Delete
          </button>
        ) : (
          ''
        )}
        {gameSettings.step === 2 ? (
          <div>
            <button onClick={handleAddVote} className='btn'>
              Add vote
            </button>
            <button onClick={handleRemoveVote} className='btn'>
              Remove vore
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Card
