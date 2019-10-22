import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'

function Card ({ card, cardId }) {
  const firebase = useFirebase()
  const { gameId } = useParams()

  useFirebaseConnect([`retrospectives/${gameId}`])

  const gameSettings = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].settings
  )

  const handleDelete = event => {
    firebase.remove(`retrospectives/${gameId}/cards/${cardId}`)
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
        <button onClick={handleDelete} className='btn'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Card
