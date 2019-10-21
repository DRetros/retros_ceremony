import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Card from './Card'
import { addCard } from '../redux/actions'

function Column ({ column }) {
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addCard({
      columnId: column.id,
      cardDescription: description
    }))
    setDescription('')
  }

  return (
    <div className='d-flex flex-column flex-fill p-5 column'>
      <h5>{column.title}</h5>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={description}
          placeholder="Write an idea"
          onChange={event => setDescription(event.target.value)}
        />
      </form>
      {column.cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  )
}

export default Column
