import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'

function Card ({ card, cardId, rgbColor }) {
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
    <div
      className='rounded mb-3'
      style={{ background: '#F4F4F4', borderLeft: `5px solid ${rgbColor}` }}
    >
      <div className='card-body'>
        <div className='d-flex'>
          <i
            class='fas fa-user-circle m-2'
            style={{ flex: 0, fontSize: '24px' }}
          ></i>
          <p className='card-text' style={{ flex: 1, fontSize: '.9em' }}>
            {card.description}
          </p>
          {gameSettings.step === 1 ? (
            <i
              onClick={handleDelete}
              className='fas fa-trash-alt m-2'
              style={{ flex: 0, fontSize: '24px' }}
            ></i>
          ) : (
            ''
          )}
        </div>

        {gameSettings.step === 2 ? (
          <div>
            <p className='card-text'>Votes: {card.votes}</p>
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
