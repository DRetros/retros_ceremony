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

function Column ({ column, rgbColor, iconCss }) {
  const [description, setDescription] = useState('')
  const { gameId } = useParams()
  const firebase = useFirebase()

  useFirebaseConnect([`retrospectives/${gameId}`])

  const cards = useSelector(
    ({ firebase: { data } }) =>
      data.retrospectives &&
      data.retrospectives[gameId] &&
      data.retrospectives[gameId].cards
  )

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
    <div className='d-flex flex-column flex-fill p-2 column'>
      <div
        className='d-flex p-3 rounded-top'
        style={{ background: 'white', borderBottom: `5px solid ${rgbColor}` }}
      >
        <h5 style={{ flex: 1 }}>{column.title}</h5>
        <i
          class={iconCss}
          style={{ flex: 0, fontSize: '24px', color: rgbColor }}
        ></i>
      </div>
      <div className='p-3' style={{ background: 'white' }}>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-2'
            value={description}
            placeholder='Write an idea'
            onChange={event => setDescription(event.target.value)}
            style={{
              border: 'dashed 2px lightgray'
            }}
          />
        </form>
      </div>
      <div className='px-3 pb-3 rounded-bottom' style={{ background: 'white' }}>
        {!isLoaded(cards) ? (
          <div>Loading...</div>
        ) : isEmpty(cards) ? (
          <div>Todos List Is Empty</div>
        ) : (
          Object.keys(cards).map(key => {
            if (cards[key].columnId === column.id) {
              return (
                <Card
                  card={cards[key]}
                  cardId={key}
                  key={key}
                  rgbColor={rgbColor}
                />
              )
            }
            return null
          })
        )}
      </div>
    </div>
  )
}

export default Column
