import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import Card from './Card'
import { addCard } from '../redux/actions'

function Column ({ column }) {
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const firebase = useFirebase()

  useFirebaseConnect([
    'retrospectives' // { path: '/todos' } // object notation
  ])

  const cards = useSelector(state => state.firebase.ordered.retrospectives)

  const handleSubmit = event => {
    const newCard = {
      columnId: column.id,
      description: description
    }

    event.preventDefault()
    firebase.push('retrospectives', newCard)
    dispatch(addCard(newCard))
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
        cards.map((card, index) => {
          if (card.value.columnId === column.id ) {
            return <Card card={card} key={index} />
          }
        })
      )}
    </div>
  )
}

export default Column
