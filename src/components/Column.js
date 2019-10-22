import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import Card from './Card'

function Column ({ column }) {
  const [description, setDescription] = useState('')
  const { gameId } = useParams()
  const firebase = useFirebase()

  useFirebaseConnect([
    `retrospectives/${gameId}`
  ])

  const cards = useSelector(({ firebase: { data } }) => data.retrospectives && data.retrospectives[gameId] && data.retrospectives[gameId].cards)

  const handleSubmit = event => {
    const newCard = {
      columnId: column.id,
      description: description,
      votes: 0
    }

    event.preventDefault()
    firebase.push(`retrospectives/${gameId}/cards`, newCard)
    setDescription('')
  }

  return (
    <div className='d-flex flex-column flex-fill p-5 column'>
      <h5>{column.title}</h5>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className="form-control mb-2"
          value={description}
          placeholder='Write an idea'
          onChange={event => setDescription(event.target.value)}
        />
      </form>
      {!isLoaded(cards) ? (
        <div>Loading...</div>
      ) : isEmpty(cards) ? (
        <div>Todos List Is Empty</div>
      ) : (
        Object.keys(cards).map(key => {
          if (cards[key].columnId === column.id ) {
            return <Card card={cards[key]} cardId={key} key={key} />
          }
          return null
        })
      )}
    </div>
  )
}

export default Column
