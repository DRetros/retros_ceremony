import React from 'react'
import {
  useFirebase
} from 'react-redux-firebase'

function Card ({ card }) {
  const firebase = useFirebase()

  const handleDelete = event => {
    firebase.remove(`retrospectives/${card.key}`)
  }

  return (
    <div className='card my-1' >
      <div className='card-body'>
        <p className='card-text'>
        {card.value.description}
        </p>
        <button onClick={handleDelete} className='btn'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Card
